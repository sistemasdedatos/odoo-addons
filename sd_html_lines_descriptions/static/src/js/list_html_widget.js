openerp.sd_html_lines_descriptions = function(instance, local){
	instance.web.list.Column.include({
		format: function (row_data, options) {
			if (this.widget == 'html')
				return instance.web.format_value (row_data[this.id].value, this, options.value_if_empty);
			else
				return this._format(row_data, options);
          },
	});
};