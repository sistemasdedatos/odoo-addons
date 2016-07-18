from openerp.osv import fields, osv
from datetime import datetime
import mailchimp
import json

class mailchimp_list(osv.osv):
    _name="mailchimp.list"
    _columns = {
            'name' : fields.char('Enter Mailchimp List Name',size=64),
            'list_id' : fields.char('List ID',size=64),
            'list_ids': fields.many2many('res.partner', 'mailchimp_customer_details', 'list_id', 'partner_id', 'List Contents'),
        }
        
    # Function to Add customers to mailchimp list through mailchimp API subscribe method     
    def add_member(self, cr, uid, ids, context=None):    
        mail_conf = self.pool.get('mailchimp.configuration')
        conf_ids = mail_conf.search(cr, uid, [('is_active','=','True')])
        chimp_data = mail_conf.browse(cr,uid, conf_ids[0])
        chimp_api_key = chimp_data.api_key
        if chimp_api_key and chimp_data.is_active:
            obj = mailchimp.Mailchimp(chimp_api_key)
            list_id_record = self.browse(cr, uid, ids[0])
            list_id = list_id_record.list_id
            for list_ids_data in self.browse(cr, uid, ids):
                data = list_ids_data.list_ids
                fname = ''
                lname = ''
                for data_email in data:
                    email = data_email.email
                    name = data_email.name
                    name_list = name.split()
                    if len(name_list) > 1:
                        fname = name_list[0]
                        lname = name_list[1]
                    if len(name_list) == 1:
                        fname = name_list[0]
                        lname = ''

                    result = obj.lists.member_info(list_id, [{'email' : email}])
                    if result.get('error_count'):
                        sub_data = obj.lists.subscribe(list_id, {'email': email}, {'FNAME': fname, 'LNAME' : lname})
                        data_email.write({'euid': sub_data.get('euid'), 'leid': sub_data.get('leid')})
        return True
    
    
    
    # Function to get List_id of the list created in mailchimp through Mailchimp API list method
    def get_list_id(self, cr, uid, ids, context=None):    
        mail_conf = self.pool.get('mailchimp.configuration')
        conf_ids = mail_conf.search(cr, uid, [('is_active','=','True')])
        chimp_data = mail_conf.browse(cr,uid, conf_ids[0])
        chimp_api_key = chimp_data.api_key
        if chimp_api_key and chimp_data.is_active:
            obj = mailchimp.Mailchimp(chimp_api_key)
            list_data = obj.lists.list()
            list_name_gui = self.browse(cr, uid, ids[0])
            list_name = list_name_gui.name
            data_list_name = list_data.get('data')
            list_id_dic = ''
            for data_list_name1 in  data_list_name:
                name = data_list_name1.get('name')
                if name == list_name:
                    id = data_list_name1.get('id')
                    list_id_dic = self.write(cr, uid, ids, {'list_id': id}, context=context)
            if list_id_dic == '':
                raise osv.except_osv(('Message!'),("The List with this Name Does Not exists"))
        return list_id_dic
    
    
    # Function to get the customers status whether they have subscribed to the emails of mailchimp
    def get_subscribed(self, cr, uid, ids, context=None):  
        print "aqui"
        res_obj = self.pool.get("res.partner")
        mail_conf = self.pool.get('mailchimp.configuration')
        conf_ids = mail_conf.search(cr, uid, [('is_active','=','True')])
        chimp_data = mail_conf.browse(cr,uid, conf_ids[0])
        chimp_api_key = chimp_data.api_key
        if chimp_api_key and chimp_data.is_active:
            print "aqui 2"
            obj = mailchimp.Mailchimp(chimp_api_key)
            list_id_gui = self.browse(cr, uid, ids[0])
            list_id = list_id_gui.list_id
            member_data = obj.lists.members(list_id)
            name_data = member_data.get('data', False)
            for cust_data_precise in name_data:
                cust_detail = cust_data_precise.get('merges', False)
                cust_fname = cust_detail.get('FNAME')
                cust_lname = cust_detail.get('LNAME')
                cust_email = cust_detail.get('EMAIL')
                cust_email = cust_detail.get('EMAIL')
                cust_dict = {
                    'name' : cust_fname + ' ' + cust_lname,
                    'email' : cust_email,
                    }
                cust_ids = res_obj.search(cr, uid, [('email', '=', cust_email)])
                if not cust_ids:
                    create_cust_id = res_obj.create(cr, uid, cust_dict)
                else:
                    create_cust_id = cust_ids[0]
                
                list_idd = cust_data_precise.get('list_id')
                cr.execute("select list_id from mailchimp_customer_details where partner_id = " + str(create_cust_id))
                cat_many_ids = cr.fetchall()
                if not cat_many_ids:
                    cr.execute("insert into mailchimp_customer_details values(" + str(ids[0]) + "," + str(create_cust_id) + ')')
                cr.commit()
            sub_data = member_data.get('data')
            for data_email in sub_data:
                email = data_email.get('email')
                status = data_email.get('status')
                if status == "subscribed":
                    partner_ids = res_obj.search(cr, uid, [('email','=',email)])
                    if partner_ids:
                        res_obj.write(cr, uid, partner_ids, {'subscribed': True}, context=context)
        return True
    
    
mailchimp_list()

class mailchimp_configuration(osv.osv):
    _name = 'mailchimp.configuration'
    _columns = {
                    'api_key' : fields.char('API KEY',size = 200),
                    'is_active' : fields.boolean('Active'),
    }
mailchimp_configuration()

class res_partner(osv.osv):
    """ Inherits partner and adds status  fields for mailchimp in the partner form """
    _inherit = 'res.partner'

    _columns = {
        'subscribed': fields.boolean('subscribed?'), 
        'euid' : fields.char('Unique ID',size=64),
        'leid' : fields.char('List Email ID',size=64),
    }

res_partner()    
        