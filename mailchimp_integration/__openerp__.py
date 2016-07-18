# -*- coding: utf-8 -*-
##############################################################################
#
#    TeckZilla Software Solutions and Services
#    Copyright (C) 2012-2013 TeckZilla-OpenERP Experts(<http://www.teckzilla.net>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    "name" : "MailChimp Integration",
    "version" : "1.1",
    "depends" : ["base"],
    'external_dependencies': {'python': ['mailchimp']},
    "author" : "TeckZilla - OpenERP Experts",
    "description": """"Mailchimp Integration""",
    "website" : "www.teckzilla.net",
    "category" : "Email",
	"price": "49.99",
	"currency": "EUR",
    "demo" : [],
    "data" : [
            'security/ir.model.access.csv',
            'security/mailchimp_integration_security.xml',
            'mailchimp_integration_view.xml',
            'wizard/mailchimp_list_view.xml',
			'images/added_member_mailchimp_6.png',
			'images/get_subsc_mailchimp_6.png',
			'images/import_mailchimp_list_thru_wiz_2.png',
			'images/import_wiz_mailchimp_3.png',
			'images/insert_customer_in_mailchimp_list_5.png',
			'images/mailchimp_all_list_imported_4.png',
			'images/mailchimp_conf15_1.png',
			'images/subscribed_customers_mailchimp.png',
			'images/subscriber_added_to_mailchimp.png',
			'images/subscription_email_mailchimp.png',
			'images/syn_with_mail_chimp.png',
			'images/test_new_sub_list_in_mailchimp.png',
    ],
    'auto_install': False,
    "installable": True,
    'application': True,
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:

