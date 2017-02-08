from openerp import models, fields, api, tools
from openerp.exceptions import Warning
from openerp.tools.translate import _

class calendar_event (models.Model):
    _inherit = 'calendar.event'

    partner_id = fields.Many2one ('res.partner', string = "Partner", related = "user_id.partner_id", readonly = True)
    partner_in_ids = fields.Many2many ('res.partner', 'calendar_event_res_partner_send_mail_rel', string = "Send mail", 
                                       domain = "[('id','in',partner_ids[0][2]), ('id', '!=', partner_id)]",
                                       help = "Check the box to notify the guest by email")
    
    @api.multi
    def write (self, values):
        res = super (calendar_event, self).write (values)
        for in_ids in self.partner_in_ids:
            if in_ids.id not in self.partner_ids.mapped ('id'):
                self.write ({'partner_in_ids': [(3, in_ids.id)]})
        if values.get('partner_in_ids', False):
            attendees_create = self.create_attendees ()
        return res
    
    @api.multi
    def create_attendees (self):
        context = self._context
        if context is None:
            context = {}
        user_obj = self.env['res.users']
        current_user = user_obj.browse (self._uid)
        res = {}
        for event in self:
            attendees = {}
            for att in event.attendee_ids:
                attendees[att.partner_id.id] = True
            new_attendees = []
            new_att_partner_ids = []
            for partner in event.partner_in_ids:
                if partner.id in attendees:
                    continue
                access_token = self.new_invitation_token (event, partner.id)
                values = {
                    'partner_id': partner.id,
                    'event_id': event.id,
                    'access_token': access_token,
                    'email': partner.email,
                }
                att_id = self.env['calendar.attendee'].create (values)
                new_attendees.append (att_id)
                new_att_partner_ids.append (partner.id)

                if not current_user.email or current_user.email != partner.email:
                    mail_from = current_user.email or tools.config.get('email_from', False)
                    if not context.get('no_email'):
                        if att_id._send_mail_to_attendees(email_from=mail_from):
                            event.message_post (body=_("An invitation email has been sent to attendee %s") % (partner.name,), subtype="calendar.subtype_invitation")
            
            if (event.partner_id in event.partner_ids) and (event.partner_id.id not in attendees):
                access_token = self.new_invitation_token (event, event.partner_id.id)
                values = {
                    'partner_id': event.partner_id.id,
                    'event_id': event.id,
                    'access_token': access_token,
                    'email': event.partner_id.email,
                    'state': 'accepted',
                }
                att_id = self.env['calendar.attendee'].create (values)
                new_attendees.append (att_id)
                new_att_partner_ids.append (event.partner_id.id)
                
            
            for att in new_attendees:
                event.write({'attendee_ids': [(4, att.id)]})
            if new_att_partner_ids:
                event.message_subscribe(new_att_partner_ids)

            # We remove old attendees who are not in partner_ids now.
            all_partner_ids = [part.id for part in event.partner_ids]
            all_part_attendee_ids = [att.partner_id.id for att in event.attendee_ids]
            all_attendee_ids = [att.id for att in event.attendee_ids]
            partner_ids_to_remove = map(lambda x: x, set(all_part_attendee_ids + new_att_partner_ids) - set(all_partner_ids))

            attendee_ids_to_remove = []

            if partner_ids_to_remove:
                attendee_ids_to_remove = self.env["calendar.attendee"].search([('partner_id.id', 'in', partner_ids_to_remove), ('event_id.id', '=', event.id)])
                if attendee_ids_to_remove:
                    attendee_ids_to_remove.unlink ()

            res[event.id] = {
                'new_attendee_ids': new_attendees,
                'old_attendee_ids': all_attendee_ids,
                'removed_attendee_ids': attendee_ids_to_remove
            }
        return res
