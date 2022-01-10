import ZenFormRender from './ZenFormRender.vue';

const fields = {};

const files = require.context('./fields', false, /\.vue$/);
files.keys().forEach(key => {
  const keyName = key.slice(2, -4);
  fields[keyName] = files(key).default;
});

const fieldRender = {
  functional: true,
  render(h, ctx) {
    let Field = fields[ctx.props.field.name || 'Input'];
    if (!Field) {
      Field = fields.Input;
      console.warn('未注册表单组件:', ctx.props.field.name);
    }
    let field = <Field {...ctx.data} />;
    return field;
  }
};

/**
 * @param {import('vue')} Vue
 */
function install(Vue, opts = {}) {
  Vue.prototype.$zenfrom = opts;
  Object.assign(fields, opts.fields);
  console.log('zen-fields:', Object.keys(fields));
  Vue.component('zen-field-render', fieldRender);
  Vue.component('zen-form-render', ZenFormRender);
}

export default {
  install,
};
