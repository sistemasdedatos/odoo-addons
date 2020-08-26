# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
from odoo import api, fields, models


TYPE2FIELD = {
    'char': 'value_text',
    'float': 'value_float',
    'boolean': 'value_integer',
    'integer': 'value_integer',
    'text': 'value_text',
    'binary': 'value_binary',
    'many2one': 'value_reference',
    'date': 'value_datetime',
    'datetime': 'value_datetime',
    'selection': 'value_text',
}

TYPE2CLEAN = {
    'boolean': bool,
    'integer': lambda val: val or False,
    'float': lambda val: val or False,
    'char': lambda val: val or False,
    'text': lambda val: val or False,
    'selection': lambda val: val or False,
    'binary': lambda val: val or False,
    'date': lambda val: val.date() if val else False,
    'datetime': lambda val: val or False,
}

class Property(models.Model):
    _inherit = 'ir.property'

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        domain="[('user_ids', '=', uid)]")


    def _get_domain(self, prop_name, model):
        res = super(Property, self)._get_domain(prop_name, model)
        ou_id = self.env['res.users'].operating_unit_default_get(self._context.get('uid')) if self._context.get(
            'uid') else self.env['res.users'].operating_unit_default_get(self._uid)
        if ou_id:
            res.append(('operating_unit_id', '=', ou_id.id))
        return res

    def _get_property(self, name, model, res_id):
        """ If we do not find the property,
            we look for it again without operating unit
        """
        res = super(Property, self)._get_property(name, model, res_id)
        if not res:
            domain = self._get_domain(name, model)
            if domain is not None:
                for i in range(0, len(domain)):
                    if domain[i][0] == 'operating_unit_id':
                        del domain[i]
                        break
                domain = [('res_id', '=', res_id)] + domain
                return self.search(domain, limit=1, order='company_id')
        return res

    @api.model
    def get_multi(self, name, model, ids):
        """ Read the property field `name` for the records of model `model` with
            the given `ids`, and return a dictionary mapping `ids` to their
            corresponding value.
        """
        if not ids:
            return {}
        ou_id = self.env['res.users'].operating_unit_default_get(self._context.get('uid')) if self._context.get('uid') else self.env['res.users'].operating_unit_default_get(self._uid)
        if ou_id:
            field = self.env[model]._fields[name]
            field_id = self.env['ir.model.fields']._get(model, name).id
            company_id = (
                    self._context.get('force_company')
                    or self.env['res.company']._company_default_get(model, field_id).id
            )


            if field.type == 'many2one':
                comodel = self.env[field.comodel_name]
                model_pos = len(model) + 2
                value_pos = len(comodel._name) + 2
                # retrieve values: both p.res_id and p.value_reference are formatted
                # as "<rec._name>,<rec.id>"; the purpose of the LEFT JOIN is to
                # return the value id if it exists, NULL otherwise
                query = """
                        SELECT substr(p.res_id, %s)::integer, r.id
                        FROM ir_property p
                        LEFT JOIN {} r ON substr(p.value_reference, %s)::integer=r.id
                        WHERE p.fields_id=%s
                            AND (p.company_id=%s OR p.company_id IS NULL)
                            AND (p.operating_unit_id=%s OR p.operating_unit_id IS NULL)
                            AND (p.res_id IN %s OR p.res_id IS NULL)
                        ORDER BY p.company_id NULLS FIRST
                    """.format(comodel._table)
                params = [model_pos, value_pos, field_id, company_id, ou_id.id]
                clean = comodel.browse

            elif field.type in TYPE2FIELD:
                model_pos = len(model) + 2
                # retrieve values: p.res_id is formatted as "<rec._name>,<rec.id>"
                query = """
                        SELECT substr(p.res_id, %s)::integer, p.{}
                        FROM ir_property p
                        WHERE p.fields_id=%s
                            AND (p.company_id=%s OR p.company_id IS NULL)
                            AND (p.operating_unit_id=%s OR p.operating_unit_id IS NULL)
                            AND (p.res_id IN %s OR p.res_id IS NULL)
                        ORDER BY p.company_id NULLS FIRST
                    """.format(TYPE2FIELD[field.type])
                params = [model_pos, field_id, company_id, ou_id.id]
                clean = TYPE2CLEAN[field.type]
            else:
                return dict.fromkeys(ids, False)

            # retrieve values
            cr = self.env.cr
            result = {}
            refs = {"%s,%s" % (model, id) for id in ids}
            for sub_refs in cr.split_for_in_conditions(refs):
                cr.execute(query, params + [sub_refs])
                a = cr.fetchall()
                result.update(a)
            # remove default value, add missing values, and format them
            default = result.pop(None, None)
            for id in ids:
                result[id] = clean(result.get(id, default))
            return result
        else:
            return super(Property, self).get_multi(name, model, ids)

    @api.model
    def set_multi(self, name, model, values, default_value=None):
        ou_id = self.env['res.users'].operating_unit_default_get(self._context.get('uid')) if self._context.get(
            'uid') else self.env['res.users'].operating_unit_default_get(self._uid)
        if ou_id:
            def clean(value):
                return value.id if isinstance(value, models.BaseModel) else value

            if not values:
                return

            if default_value is None:
                domain = self._get_domain(name, model)
                if domain is None:
                    raise Exception()
                # retrieve the default value for the field
                default_value = clean(self.get(name, model))

            # retrieve the properties corresponding to the given record ids
            self._cr.execute("SELECT id FROM ir_model_fields WHERE name=%s AND model=%s", (name, model))
            field_id = self._cr.fetchone()[0]
            company_id = self.env.context.get('force_company') or self.env['res.company']._company_default_get(model,
                                                                                                               field_id).id
            refs = {('%s,%s' % (model, id)): id for id in values}
            props = self.search([
                ('fields_id', '=', field_id),
                ('company_id', '=', company_id),
                ('operating_unit_id', '=', ou_id.id),
                ('res_id', 'in', list(refs)),
            ])
            # modify existing properties
            for prop in props:
                id = refs.pop(prop.res_id)
                value = clean(values[id])
                if value == default_value:
                    # avoid prop.unlink(), as it clears the record cache that can
                    # contain the value of other properties to set on record!
                    prop.check_access_rights('unlink')
                    prop.check_access_rule('unlink')
                    self._cr.execute("DELETE FROM ir_property WHERE id=%s", [prop.id])
                elif value != clean(prop.get_by_record()):
                    prop.write({'value': value})

            # create new properties for records that do not have one yet
            vals_list = []
            for ref, id in refs.items():
                value = clean(values[id])
                if value != default_value:
                    vals_list.append({
                        'fields_id': field_id,
                        'company_id': company_id,
                        'operating_unit_id': ou_id.id,
                        'res_id': ref,
                        'name': name,
                        'value': value,
                        'type': self.env[model]._fields[name].type,
                    })
            self.create(vals_list)
        else:
            super(Property, self).set_multi(name, model, values, default_value)
