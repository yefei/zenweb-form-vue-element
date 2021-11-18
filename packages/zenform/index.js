import { Form, FormItem, Input, Select, Option, Button } from 'element-ui';

const widgets = {
  default(name, field) {
    return <Input
      v-model={this.form[name]}
      maxlength={field.validate && field.validate.maxLength}
      minlength={field.validate && field.validate.minLength}
      show-word-limit={field.validate && field.validate.maxLength > 0}
      placeholder={field.placeholder}
    />;
  },
  Select(name, field) {
    return (
      <Select v-model={this.form[name]}>
        {field.choices.map(c => <Option label={c.label} value={c.value} />)}
      </Select>
    );
  },
};

/**
 * @param {import('vue')} vue
 */
function install(vue) {
  vue.component('zen-form-render', {
    props: ['layout', 'fields', 'errors', 'size'],
    data() {
      return {
        rules: {},
        form: {},
      }
    },
    render() {
      return (
        <Form ref="form" model={this.form} rules={this.rules} size={this.size}>
          {this.layout.map(name => {
            const field = this.fields[name];
            const fieldEl = (field.widget && widgets[field.widget]) || widgets.default;
            return (
              <FormItem label={field.label || name} prop={name}>
                {fieldEl.call(this, name, field)}
              </FormItem>
            );
          })}
          <FormItem>
            <Button type="primary" onClick={this.submit}>提交</Button>
            <Button onClick={this.cancel}>取消</Button>
          </FormItem>
        </Form>
      );
    },
    created() {
      const form = {};
      const rules = {};
      for (const [k, o] of Object.entries(this.fields)) {
        form[k] = o.default || '';
        if (!rules[k]) rules[k] = [];
        if (o.required) {
          // 必填项
          rules[k].push({ required: true, message: typeof o.required === 'string' ? o.required : '必填项', trigger: 'blur' });
        }
        if (o.validate) {
          // 长度验证
          if (o.validate.maxLength || o.validate.minLength) {
            const _lenObj = { trigger: 'blur' };
            o.validate.maxLength && (_lenObj['max'] = o.validate.maxLength);
            o.validate.minLength && (_lenObj['min'] = o.validate.minLength);
            rules[k].push(_lenObj);
          }
        }
      }
      this.form = form;
      this.rules = rules;
    },
    methods: {
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit('submit', this.form);
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$emit('cancel');
      }
    },
  });
}

export default {
  install,
};
