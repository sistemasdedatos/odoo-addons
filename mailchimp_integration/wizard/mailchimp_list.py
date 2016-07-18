from openerp.osv import fields, osv
from datetime import datetime
import mailchimp
import json

class import_mailchimp_list(osv.osv):
    _name = 'import.mailchimp.list'

    def import_list(self, cr, uid, ids, context):
        mail_conf = self.pool.get('mailchimp.configuration')
        mail_lists_obj = self.pool.get('mailchimp.list')
        conf_ids = mail_conf.search(cr, uid, [('is_active','=','True')])
        chimp_data = mail_conf.browse(cr,uid, conf_ids[0])
        chimp_api_key = chimp_data.api_key
        if chimp_api_key and chimp_data.is_active:
            chimp_obj = mailchimp.Mailchimp(chimp_api_key)
            list_data = chimp_obj.lists.list()
            for li_data in list_data.get('data'):
                vals = {
                'list_id' : li_data['id'],
                'name' : li_data['name']
                }
                list_ids = mail_lists_obj.search(cr, uid, [('list_id','=',li_data['id']),('name','=',li_data['name'])])
                if not list_ids:
                    mail_lists_obj.create(cr, uid , vals)
                else:
                    mail_lists_obj.write(cr, uid ,list_ids[0], vals)
        return True

import_mailchimp_list()