import ZenFormRender from './ZenFormRender.vue';

const fields = {};

const files = require.context('./fields', false, /\.vue$/);
files.keys().forEach(key => {
  const keyName = key.slice(2, -4);
  fields[keyName] = files(key).default;
});

const fieldRender = {
  render(h) {
    const self = this;
    let Field = fields[this.$attrs.field.name || 'Input'];
    if (!Field) {
      Field = fields.Input;
      console.warn('未注册表单组件:', this.$attrs.field.name);
    }
    return h(Field, {
      props: this.$attrs,
      on: {
        input(value) {
          self.$emit('input', value);
        }
      }
    });
  }
};

/**
 * @param {import('vue')} Vue
 */
function install(Vue, opts = {}) {
  Vue.prototype.$zenfrom = opts;
  Object.assign(fields, opts.fields);
  Vue.component('zen-field-render', fieldRender);
  Vue.component('zen-form-render', ZenFormRender);
}

export default {
  install,
};
