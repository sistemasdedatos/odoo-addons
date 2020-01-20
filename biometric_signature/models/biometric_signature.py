#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from openerp import api, fields, models, _
from openerp.exceptions import Warning, ValidationError
import requests

class BiometricConfig(models.Model):
    _name = 'biometric.config'
    _description = 'Biometric signature configuration'
    
    name = fields.Char(string = "Name", compute = '_compute_name')
    url = fields.Char(string = 'Server URL', required = True)
    web_service = fields.Char(string = "Web service", required = True)
    user = fields.Char(string = 'Aplication user', required = True)
    passwd = fields.Char(string = 'Aplication password', required = True)
    user_id = fields.Many2one(string = 'Odoo user', comodel_name = 'res.users', required = True)
            
    @api.constrains('web_service', 'url')
    def _check_http(self):
        for record in self:
            if record.web_service[0] == '/':
                raise ValidationError(_("The web service cannot start with '/'"))
            if record.url[:4] != 'http':
                raise ValidationError(_("The url has to start with 'http://' or 'https://'"))
    
    def _compute_name(self):
        self.name = _('Configuration %s') % self.id
    
    @api.multi
    def login(self):
        response_codes = {200: lambda x: x.headers.get('Set-Cookie').split(' ')[0][:len(x.headers.get('Set-Cookie').split(' ')[0]) - 1],
                          400: lambda msj: _('Incorrect request'),
                          403: lambda msj: _('Forbiden'),
                          404: lambda msj: _('Server not responding'),
                          405: lambda msj: _('Method not allowed'),
                          450: lambda msj: _('Parameters error'),
                          451: lambda msj: _('There is no user'),
                          452: lambda msj: _('Underregistered user'),
                          453: lambda msj: _('Login failed'),
                          454: lambda msj: _('Disabled user'),
                          455: lambda msj: _('Error in odoo validation'),
                          500: lambda msj: _('Internal server error')}
        data = {'usuario': self.user, 
                'clave': self.passwd}
        try:
            resp = requests.post(self.url+'/'+self.web_service, data)
            res = [resp.status_code, response_codes[resp.status_code](resp)]
            return res
        except Exception:
            raise Warning (_('Unknown response error in login function'))
    
class BiometricSignature(models.Model):
    _name = 'biometric.signature'
    _description = 'Biometric Signature'
    
    name = fields.Char(string = "Name", compute = '_compute_name')
    model_id = fields.Many2one(string = 'Model to sign', comodel_name = 'ir.model', required = True)
    biometric_config_id = fields.Many2one(string = 'Biometric config', comodel_name = 'biometric.config', required = True)
    field_id = fields.Many2one(string = 'Field to verify the sign', comodel_name = 'ir.model.fields')
    action_server_id = fields.Many2one(string = 'Field to verify the sign', comodel_name = 'ir.actions.server')
    
    def _compute_name(self):
        self.name = _('Sign for %s') % self.model_id.name
    
    @api.multi
    def sign_on(self):
        url_params = "model=%s&resource=%s&ownerid=%s" % (self._context['active_model'], self._context['active_ids'], self._context['uid'])
        resp = self.biometric_config_id.login()
        token = resp[1] if resp[0] == 200 else False
        if not token:
            raise Warning(resp[1])
        res = {'name': _('Sign document'),
               'type': 'ir.actions.act_url',
               'res_model': 'ir.actions.act_url',
               'target': 'self',
               'url': self.biometric_config_id.url+'/setcookie?%s&%s' % (token, url_params)}
        return res
    
    @api.model
    def create(self, vals):
        res = super(BiometricSignature, self).create(vals)
        try:
            field = self.env['ir.model.fields'].search([('name', '=', 'x_signed'), ('model_id', '=', res.model_id.id)])
            if not field:
                new_field = {'name': 'x_signed',
                             'type': 'boolean',
                             'field_description': _('Document signed'),
                             'model_id': res.model_id.id,
                             'select_level': '0',
                             'readonly': True}
                field = self.env['ir.model.fields'].create(new_field)
            res.field_id = field
        except Exception:
            raise Warning (_('Error on create field x_signed in %s') % self.model_id.name)
        try:
            for record in self.env[res.model_id.model].search([]):
                record.x_signed = False
        except Exception:
            raise Warning ('Error al inicializar el campo x_signed')
        try:
            action = self.env['ir.actions.server'].search([('name', '=', 'Sign %s action' % res.model_id.name), ('model_id', '=', res.model_id.id)])
            if not action:
                code = """#Llamada a la funcion firmar
model_id = env['ir.model'].search([('model','=',record._context['active_model'])])
biometric_obj = env['biometric.signature'].search([('model_id','=',model_id.id)])
action = biometric_obj.sign_on()"""
                new_action = {'name': _('Sign %s action') % res.model_id.name,
                              'model_id': res.model_id.id,
                              'state': 'code',
                              'code': code}
                action = self.env['ir.actions.server'].create(new_action)
            res.action_server_id = action
            res.action_server_id.create_action()
        except Exception:
            raise Warning (_('Error on create action'))
        return res        
