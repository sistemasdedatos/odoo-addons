# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).

from odoo import models
from odoo.http import request


class Http(models.AbstractModel):
    _inherit = "ir.http"

    def session_info(self):
        session_info = super(Http, self).session_info()
        user = request.env.user
        if user.default_operating_unit_id:
            session_info.update(
                {"name": session_info['name']+' ('+user.default_operating_unit_id.name+')'}
            )
        return session_info