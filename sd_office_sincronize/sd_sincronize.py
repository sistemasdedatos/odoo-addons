from O365 import *
from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import html2text
from matplotlib.cbook import Null
import datetime
import time

class sd_office_config (models.Model):
    '''Clase encargada de la configuracion de las cuentas de office'''
     
    _name = 'sd.office.config'
    
    name = fields.Char (string = 'Account', required = True)
    passwd = fields.Char (string = "Password", required = True)
    confirmed = fields.Boolean (string = "Confirmed", compute = 'set_confirmed', store = True)
    same_user = fields.Boolean (compute = 'uid_like_createuid')                         #comprobar que el usuario es el mismo que creo el elemento
    
    @api.model
    def create (self, values):
        uid_create = super (sd_office_config, self).search ([('create_uid', '=', self._uid)]).read(['name'])
        if len (uid_create) != 0:
            raise Warning (_("This user has a Office account created: %s, please edit this account" % uid_create[0]['name']))
        return super (sd_office_config, self).create (values)
    
    @api.multi
    def unlink (self):
        groups = self.env.ref ('sd_office_sincronize.sd_office_manager_group').read (['users'])[0]['users']
        res = []
        for i in self:
            same_user = i._uid == i.create_uid.id
            if (not same_user) and (self._uid not in groups):
                raise Warning (_("You can't delete an account that you have not created by you"))
            else:
                super (sd_office_config, i).unlink ()
        return super (sd_office_config, self).unlink ()
    
    @api.depends ('name','passwd')
    def set_confirmed (self):           #si se cambia la cuenta o la contrasenia se quita la confirmacion
        self.confirmed = False
             
    @api.multi
    def test_confirm (self):
        '''Se realiza la comprobacion de que los datos de la cuenta de Office son correctos'''
        schedule = Schedule ((self.name, self.passwd))
        try:
            result = schedule.getCalendars ()
            self.confirmed = True
        except:
            raise Warning (_('Login failed for %s' % self.name))
    
    @api.multi
    @api.depends('create_uid')
    def uid_like_createuid (self):
        '''Se comprueba que el uid y el usuario creador de la cuenta de office son el mismo
           con esto le damos seguridad para que solo pueda modificar la cuenta su duenio'''
        if self._uid == self.create_uid.id or len (self.create_uid) == 0:
            self.same_user = True
            return
        self.same_user = False
        
sd_office_config ()

flag = False        #Bandera para que no vuelva a sincronizar en caso de que estemos trayendo datos desde office

class sd_office_sync (models.TransientModel):
    '''Clase para sincronizar con outlook'''
    
    _name = 'sd.office.sync'
    
    @api.model
    def set_config_id (self):
        config_id = self.env['sd.office.config'].search ([('create_uid', '=', self._uid)])
        if config_id:
            return config_id[0].id
        return False
    
    @api.multi
    def set_date_init (self):
        return time.strftime('%Y-%m-%d')
    
    @api.multi
    def set_date_end (self):
        def last_day_of_month (any_day):
            next_month = any_day.replace (day=28) + datetime.timedelta (days=4)  # this will never fail
            return next_month - datetime.timedelta (days = next_month.day)
        return last_day_of_month (datetime.date (int (time.strftime ('%Y')), int (time.strftime ('%m')), 1))
    
    sd_office_config_id = fields.Many2one ('sd.office.config', string = "Account", default = set_config_id, readonly = True)
    date_init = fields.Date (string = "Initial Date", default = set_date_init, required = True)
    date_end = fields.Date (string = "End Date", default = set_date_end, required = True)
    
    @api.multi
    def sync_events (self, context = False, odoo_events = False):
        '''Conectarse con usuario y contrasaenia al calendario de office y traer los eventos en el json
        Funcion principal con las llamadas a las demas funciones'''
        partner_ids = []
        global flag
        for i in self.env['res.users'].search ([('partner_id', '!=', False)]):
            partner_ids.append (i.partner_id.id)
            
        if not flag and context['DirSync'] == 'ToOffice':
            if not odoo_events:
                partner_id = self.env['res.users'].browse ([self._uid]).partner_id.id        #obtenemos el id de la tabla partner del usuario
                odoo_events = self.env['calendar.event'].search ([('start', '>=', self.date_init), ('stop', '<=', self.date_end), ('partner_ids', 'child_of', partner_id)])
            for event in odoo_events:
                for attendee in self.env['calendar.attendee'].search ([('event_id', '=', event.id), ('state', '=', 'accepted'), ('partner_id', 'in', partner_ids)]):
                    user_id = self.env['res.users'].search ([('partner_id', '=', attendee.partner_id.id)]).id
                    config_id = self.env['sd.office.config'].search ([('create_uid', '=', user_id), ('confirmed', '=', True)])
                    if config_id:
                        self.sd_office_config_id = config_id[0].id
                        if not self.check_office_account ():
                            raise Warning (_("The Office account is not verified"))
                        office_events = self.get_office_events ()
                        if self.check_office_event(odoo_event = event, events_office = office_events, attendee = attendee):
                            self.send_to_office (event, attendee)
                        else:
                            self.update_office (event, attendee)
        
        elif context['DirSync'] == 'ToOdoo':
            if not self.check_office_account ():
                raise Warning (_("The Office account is not verified"))
            office_events = self.get_office_events ()
            for event in office_events:
                if self.check_odoo_event (office_event = event):
                    self.create_event (event)
                else:
                    self.update_event(event)
                            
        return True
    
    def check_office_account (self):
        '''Comprobar que el usuario tiene cuenta de office'''
        if self.sd_office_config_id and self.sd_office_config_id.confirmed:
            return True
        return False
    
    def get_office_events (self):
        '''Extraer eventos del calendario de office'''
        schedule = Schedule((self.sd_office_config_id.name,self.sd_office_config_id.passwd))
        try:
            result = schedule.getCalendars()
        except:
            raise Warning (_('Login failed for', self.sd_office_config_id.name))
        bookings = []
        cal = schedule.calendars[0]     #solo se mira el primer calendario encontrado en la cuenta
        try:
            start = datetime.datetime.strptime (self.date_init, '%Y-%m-%d') - datetime.timedelta (days = 1)
            stop = datetime.datetime.strptime (self.date_end, '%Y-%m-%d') + datetime.timedelta (days = 1)
            result = cal.getEvents(start = start, end = stop)
        except:
            raise Warning (_('failed to fetch events'))
        for event in cal.events:
            out = {}
            out = event.fullcalendarioJson()
            out['description'] = event.getBody()
            h = html2text.HTML2Text ()
            out['description'] = h.handle (out['description'])
            out['attendees'] = event.getAttendees()
            out['location'] = event.json['Location']['DisplayName']
            out['reminder'] = event.json['Reminder']
            out['start'] = out['start'].replace ('T', ' ')
            out['start'] = out['start'].replace ('Z', '')
            out['end'] = out['end'].replace ('T', ' ')
            out['end'] = out['end'].replace ('Z', '')
            out['id'] = event.json['Id']
            bookings.append (out)
        return bookings
    
    def check_odoo_event (self, office_event):
        '''comprobar que el evento a crear no esta previamente creado en Odoo'''
        try:
            partner_id = self.env['res.users'].browse ([self._uid]).partner_id.id
            same_event = self.env['calendar.attendee'].search ([('partner_id', '=', partner_id), ('office_id', '=', office_event['id'])])
            if len(same_event) != 0:
                return False
            return True
        except:
            raise Warning (_("Error to check repeat odoo event, contact with your administrator system"))
    
    def check_office_event (self, odoo_event, events_office, attendee):
        '''comprobar que el evento a crear no esta previamente creado en Office'''
        try:
            for office_event in events_office:
                if office_event['id'] == attendee.office_id:
                    return False
            return True
        except:
            raise Warning (_("Error to check repeat office event, contact with your administrator system"))
    
    def create_event (self, office_event):
        '''crear cada evento en odoo'''
        try:
            global flag
            flag = True
            event_create = self.env['calendar.event'].create ({'name': office_event['title'],
                                                               'start': office_event['start'],
                                                               'stop': office_event['end'],
                                                               'categ_ids': [(6, 0, [self.env['calendar.event.type'].search ([('name', '=', 'Office Sync')]).id])]})
#                                                                'office_id': office_event['id']})
            if office_event['IsAllDay'] == True:
                event_create.write ({'allday': 1,
                                     'start_date': office_event['start'][0:10],
                                     'stop': str (datetime.datetime.strptime (office_event['end'][0:10], '%Y-%m-%d') - datetime.timedelta (days = 1))[0:10],
                                     'stop_date': str (datetime.datetime.strptime (office_event['end'][0:10], '%Y-%m-%d') - datetime.timedelta (days = 1))[0:10]})
            else:
                event_create.write ({'allday': 0,
                                     'start_datetime': office_event['start'],
                                     'stop_datetime': office_event['end']})
            if len (office_event['location']) != 0:
                event_create.write ({'location': office_event['location']})
            if len (office_event['description']) != 0:
                event_create.write ({'description': office_event['description']})
            if office_event['reminder'] in [15, 30, 60, 120, 1440]:
                event_create.write ({'alarm_ids': [(6, 0, [self.env['calendar.alarm'].search ([('duration_minutes', '=', office_event['reminder'])]).id])]})
            partner_id = self.env['res.users'].browse ([self._uid]).partner_id.id
            attendee = self.env['calendar.attendee'].search ([('event_id', '=', event_create.id), ('partner_id', '=', partner_id)])
            attendee.write ({'office_id': office_event['id']})
            flag = False
            return True
        except:
            raise Warning (_("Error to create Odoo events, contact with your administrator system"))
        
    def update_event (self, office_event):
        '''Actualizar cada evento en odoo'''
        try:
            global flag
            flag = True
            id_event = self.env['calendar.attendee'].search ([('office_id', '=', office_event['id'])]).event_id
            event_create = self.env['calendar.event'].browse ([id_event])
            event_create.write ({'name': office_event['title'],
                                 'start': office_event['start'],
                                 'stop': office_event['end'],
                                 'categ_ids': [(6, 0, [self.env['calendar.event.type'].search ([('name', '=', 'Office Sync')]).id])]})
            if office_event['IsAllDay'] == True:
                event_create.write ({'allday': 1,
                                     'start_date': office_event['start'][0:10],
                                     'stop': str (datetime.datetime.strptime (office_event['end'][0:10], '%Y-%m-%d') - datetime.timedelta (days = 1))[0:10],
                                     'stop_date': str (datetime.datetime.strptime (office_event['end'][0:10], '%Y-%m-%d') - datetime.timedelta (days = 1))[0:10]})
            else:
                event_create.write ({'allday': 0,
                                     'start_datetime': office_event['start'],
                                     'stop_datetime': office_event['end']})
            if len (office_event['location']) != 0:
                event_create.write ({'location': office_event['location']})
            if len (office_event['description']) != 0:
                event_create.write ({'description': office_event['description']})
            if office_event['reminder'] in [15, 30, 60, 120, 1440]:
                event_create.write ({'alarm_ids': [(6, 0, [self.env['calendar.alarm'].search ([('duration_minutes', '=', office_event['reminder'])]).id])]})
            flag = False
            return True
        except:
            raise Warning (_("Error to Update Odoo events, contact with your administrator system"))
    
    def send_to_office (self, odoo_event, attendee):
        '''Escribir eventos en office'''
        schedule = Schedule((self.sd_office_config_id.name, self.sd_office_config_id.passwd))
        try:
            result = schedule.getCalendars ()
        except:
            raise Warning (_('Login failed for', self.sd_office_config_id.name))
    
        try:
            ev = Event (auth=(self.sd_office_config_id.name, self.sd_office_config_id.passwd), cal = schedule.calendars[0])
        #    at = ev.setAttendee({"EmailAddress":{"Address":"mfernandez@sdatos.es","Name":"Cesar Toledo"}})    #asistentes
            if odoo_event.description:
                ev.json['Body'] = {"Content": odoo_event.description}                                           #Contenido
            if odoo_event.location:
                ev.json['Location'] = {"DisplayName": odoo_event.location}                                      #Lugar
            if odoo_event.allday:
                ev.json['IsAllDay'] = True
                ev.setEnd (str (datetime.datetime.strptime (odoo_event.stop, '%Y-%m-%d %H:%M:%S') + datetime.timedelta (days = 1)).replace(' ', 'T')+'Z')  #Fin + un dia
            else:
                ev.json['IsAllDay'] = False
                ev.setEnd (odoo_event.stop.replace(' ', 'T')+'Z')
            if len (odoo_event.alarm_ids) != 0 and odoo_event.alarm_ids[0].type == "notification":
                odoo_event.alarm_ids[0].duration_minutes
                ev.json['Reminder'] = odoo_event.alarm_ids[0].duration_minutes                                  #Recordatorio
            ev.setStart (odoo_event.start.replace(' ', 'T')+'Z')                                                #Inicio
            ev.setSubject (odoo_event.name)
            ev = ev.create (schedule.calendars[0])
            attendee.sudo ().write ({'office_id': ev.json['Id']})
            return True
        except:
            raise Warning (_("Error to send odoo event %s to office calendar" % odoo_event.name))
            
    def update_office (self, odoo_event, attendee):
        '''Actualizar eventos  en office'''
        schedule = Schedule((self.sd_office_config_id.name, self.sd_office_config_id.passwd))
        try:
            result = schedule.getCalendars ()
        except:
            raise Warning (_('Login failed for', self.sd_office_config_id.name))
    
        try:
            ev = Event (auth=(self.sd_office_config_id.name, self.sd_office_config_id.passwd), cal = schedule.calendars[0])
            if odoo_event.description:
                ev.json['Body'] = {"Content": odoo_event.description}                                           #Contenido
            if odoo_event.location:
                ev.json['Location'] = {"DisplayName": odoo_event.location}                                      #Lugar
            if odoo_event.allday:
                ev.json['IsAllDay'] = True
                ev.setEnd (str (datetime.datetime.strptime (odoo_event.stop, '%Y-%m-%d %H:%M:%S') + datetime.timedelta (days = 1)).replace(' ', 'T')+'Z')  #Fin + un dia
            else:
                ev.json['IsAllDay'] = False
                ev.setEnd (odoo_event.stop.replace(' ', 'T')+'Z')
            if len (odoo_event.alarm_ids) != 0 and odoo_event.alarm_ids[0].type == "notification":
                odoo_event.alarm_ids[0].duration_minutes
                ev.json['Reminder'] = odoo_event.alarm_ids[0].duration_minutes                                  #Recordatorio
            ev.setStart (odoo_event.start.replace(' ', 'T')+'Z')                                                #Inicio
            ev.setSubject (odoo_event.name)
            ev.json['Id'] = attendee.office_id
            ev = ev.update ()
            return True
        except:
            raise Warning (_("Error to update odoo event %s to office calendar" % odoo_event.name))
    
    def delete_office (self, odoo_event, attendees = False):   
        '''Eliminar eventos  en office'''
        partner_ids = []
        for i in self.env['res.users'].search ([('partner_id', '!=', False)]):
            partner_ids.append (i.partner_id.id)
        if attendees:
            for attendee in attendees:
                if attendee.state == "accepted" and attendee.partner_id.id in partner_ids:
                    user_id = self.env['res.users'].search ([('partner_id', '=', attendee.partner_id.id)]).id
                    config_id = self.env['sd.office.config'].search ([('create_uid', '=', user_id), ('confirmed', '=', True)])
                    if config_id:
                        self.sd_office_config_id = config_id[0].id
                        schedule = Schedule ((self.sd_office_config_id.name, self.sd_office_config_id.passwd))
                        try:
                            result = schedule.getCalendars ()
                        except:
                            raise Warning (_('Login failed for', self.sd_office_config_id.name))
                    
                        try:
                            ev = Event (auth=(self.sd_office_config_id.name, self.sd_office_config_id.passwd), cal = schedule.calendars[0])
                            ev.json['Id'] = attendee.office_id
                            ev = ev.delete ()
                        except:
                            raise Warning (_("Error to delete odoo event %s to office calendar" % odoo_event.name))
        return True
        
class calendar_attendee (models.Model):   
    _inherit = "calendar.attendee" 
    
    office_id = fields.Char ('Id Office', readonly = True)
    