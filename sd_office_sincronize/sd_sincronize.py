from O365 import *
from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import html2text
from matplotlib.cbook import Null

class sd_office_config (models.Model):
    '''Clase encargada de la configuracion de las cuentas de office'''
     
    _name = 'sd.office.config'
    
    name = fields.Char (string = 'Account', required = True)
    passwd = fields.Char (string = "Password", required = True)
    confirmed = fields.Boolean (string = "Confirmed", compute = 'set_confirmed', store = True)
    same_user = fields.Boolean (compute = 'uid_like_createuid')                         #comprobar que el usuario es el mismo que creo el elemento
    
#     @api.model
#     def create (self, values):
#         res = super (sd_office_config, self).create (values)
#         print self.create_uid
#         print res.create_uid
#         if (res.create_uid):
#             uid_create = super (sd_office_config, self).search ([('create_uid', '=', res.create_uid.id)]).read(['name'])
#             if len (uid_create) != 0:
#                 raise Warning (_("This user has a Office account created: %s, please edit this account" % uid_create[0]['name']))
#         return res
    
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

class sd_office_sync (models.TransientModel):
    '''Clase para sincronizar con outlook'''
    
    _name = 'sd.office.sync'
    _transient_max_hours = 0.2
    
    @api.model
    def set_config_id (self):
        config_id = self.env['sd.office.config'].search ([('create_uid', '=', self._uid)])
        if config_id:
                return config_id[0].id
        return False
    
    sd_office_config_id = fields.Many2one ('sd.office.config', string = "Account", default = set_config_id, readonly = True)
    date_init = fields.Date (string = "Initial Date", required = True)
    date_end = fields.Date (string = "End Date", required = True)
    
    @api.multi
    def sync_events (self, context = False):
        '''Conectarse con usuario y contrasaenia al calendario de office y traer los eventos en el json
        Funcion principal con las llamadas a las demas funciones'''
        if not self.check_office_account ():
            raise Warning (_("The Office account is not verified"))
            return False
        
        partner_id = self.env['res.users'].browse ([self._uid]).partner_id.id        #obtenemos el id de la tabla partner del usuario
        office_events = self.get_office_events ()
        odoo_events = self.env['calendar.event'].search ([('start', '>=', self.date_init), ('stop', '<=', self.date_end), ('partner_ids', 'child_of', partner_id)])
 
        if context['DirSync'] == 'ToOdoo':
            for event in office_events:
                if self.check_odoo_event (office_event = event):
                    self.create_event (event)
        elif context['DirSync'] == 'ToOffice':
            for event in odoo_events:
                if self.check_office_event(odoo_event = event, events_office = office_events):
                    self.send_to_office (event)
        
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
            result = cal.getEvents(start = self.date_init, end = self.date_end)
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
            bookings.append (out)
        
        return bookings
    
    def check_odoo_event (self, office_event):
        '''comprobar que el evento a crear no esta previamente creado en Odoo'''
        try:
            partner_id = self.env['res.users'].browse ([self._uid]).partner_id.id
            same_event = self.env['calendar.event'].search ([('start', '>=', office_event['start']), ('stop', '<=', office_event['end']), ('partner_ids', 'child_of', partner_id)])
            if len(same_event) != 0:
                return False
            return True
        except:
            raise Warning (_("Error to check repeat odoo event, contact with your administrator system"))
    
    def check_office_event (self, odoo_event, events_office):
        '''comprobar que el evento a crear no esta previamente creado en Office'''
        try:
            for office_event in events_office:
                if office_event['title'] == odoo_event.name and office_event['start'] == odoo_event.start and office_event['end'] == odoo_event.stop:
                    return False
            return True
        except:
            raise Warning (_("Error to check repeat office event, contact with your administrator system"))
    
    def create_event (self, office_event):
        '''crear cada evento en odoo'''
        try:
            event_create = self.env['calendar.event'].create ({'name': office_event['title'],
                                                               'start': office_event['start'],
                                                               'stop': office_event['end'],
                                                               'categ_ids': [(6, 0, [self.env['calendar.event.type'].search ([('name', '=', 'Office Sync')]).id])]})
            if office_event['IsAllDay'] == True:
                event_create.write ({'allday': 1,
                                     'start_date': office_event['start'][0:10],
                                     'stop_date': office_event['end'][0:10]})
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
            return True
        except:
            raise Warning (_("Error to create Odoo events, contact with your administrator system"))
    
    def send_to_office (self, odoo_event):
        '''Escribir eventos en office'''
        schedule = Schedule((self.sd_office_config_id.name, self.sd_office_config_id.passwd))
        try:
            result = schedule.getCalendars ()
        except:
            raise Warning (_('Login failed for', self.sd_office_config_id.name))
    
        try:
            ev = Event (auth=(self.sd_office_config_id.name, self.sd_office_config_id.passwd), cal = schedule.calendars[0])
        #    at = ev.setAttendee({"EmailAddress":{"Address":"mfernandez@sdatos.es","Name":"Cesar Toledo"}})    #asistentes
            if len (odoo_event.description) != 0:
                ev.json['Body'] = {"Content": odoo_event.description}            #Contenido
            if odoo_event.location:
                ev.json['Location'] = {"DisplayName": odoo_event.location}        #Lugar
            if odoo_event.allday:
                ev.json['IsAllDay'] = True
            if len (odoo_event.alarm_ids) != 0 and odoo_event.alarm_ids.type == "notification":
                ev.json['Reminder'] = odoo_event.alarm_ids[0].duration_minutes                        #Recordatorio
            ev.setStart (odoo_event.start.replace(' ', 'T')+'Z')                    #Inicio
            ev.setEnd (odoo_event.stop.replace(' ', 'T')+'Z')                    #Fin
            ev.setSubject (odoo_event.name)                            #Asunto
            ev = ev.create (schedule.calendars[0])
            return True
        except:
            raise Warning (_("Error to send odoo event %s to office calendar" % odoo_event.name))
            
    
    