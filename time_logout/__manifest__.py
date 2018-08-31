# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    Copyright 2018 Sistemas de Datos - Lorenzo Martin Alvarez <lmartin@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Time Logout',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Time for automatic logout',
    'license': 'AGPL-3',
    'description' : """
Time for automatic logout
=========================

Implemented in JS.
You can set inactivity timeout for each user.
While you don't do any action in the web navegator, the counter is incremented each second until go to sesion timeout, when you move mouse or press any key the counter is setted on 0.
When you close the last odoo tab, logout is called.
The program have a control abaut each navegator tabs and if you are editing in any tab, the form is saved and logout is called, also you can configurate to don't close if you are editing.
It is compatible with firefox and chrome.
No tested in Edge, Internet Explorer and Opera.
No tested with website modules.

""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : [],
    'data': ['views/templates.xml',
             'views/res_users_view.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}