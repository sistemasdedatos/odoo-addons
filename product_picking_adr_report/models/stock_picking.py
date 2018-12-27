# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.03
from odoo import api, fields, models, tools, _
from collections import defaultdict


class Picking(models.Model):
    _inherit = "stock.picking"

    with_adr = fields.Boolean(string="Picking with ADR", compute='_get_adr_config', invisible=True)
                              #states={'done': [('invisible', True)], 'cancel': [('invisible', True)]})

    @api.multi
    def _get_adr_config(self):
        self.ensure_one()
        w = p = cnt = 0
        res = {}
        cfg_dict = {}
        filter_operations = list(filter(lambda x: x.product_id.adr_id.id != False, self.pack_operation_ids))            #lines with ADR
        lines = list(map(lambda x: {x.product_id.adr_id.adr_config_id: x}, filter_operations))
        adr_configs = list(set(list(map(lambda x: x.product_id.adr_id.adr_config_id, filter_operations))))
        for i in adr_configs:
            cfg_dict[i] = list(map(lambda x: x[i], lines))
        for cfg in cfg_dict:
            w = p = 0
            onu = pack = ''
            for line in cfg_dict[cfg]:
                w = w + line.product_id.adr_uom_equal * line.qty_done
                p = p + line.qty_done
                onu = line.product_id.adr_id.onu_code + ' ' + line.product_id.adr_id.description
            res[cnt] = {'weight': str(w) + ' ' + line.product_id.adr_uom_id.name,
                        'packaging': p,
                        'onu': onu,
                        'package': cfg.package,
                        'notes': cfg.notes}
            if cfg.max_weight <= w:
                res[cnt]['notes'] = False
            cnt = cnt + 1
        res['lines'] = cnt
        if cnt > 0:
            self.with_adr = True
        return res
