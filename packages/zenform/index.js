import ZenFormRender from './ZenFormRender.vue';
import Input from './Input.vue';
import Date from './Date.vue';
import Radio from './Radio.vue';
import Select from './Select.vue';
import Multiple from './Multiple.vue';
import Checkbox from './Checkbox.vue';

const widgets = {
  Input,
  Date,
  Radio,
  Select,
  Multiple,
  Checkbox,
};

const fieldRender = {
  render(h) {
    const self = this;
    let widget = widgets[this.$attrs.field.widget || 'Input'];
    if (!widget) {
      widget = widgets.Input;
      console.warn('未注册表单组件:', this.$attrs.field.widget);
    }
    return h(widget, {
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
  Object.assign(widgets, opts.widgets);
  Vue.component('zen-field-render', fieldRender);
  Vue.component('zen-form-render', ZenFormRender);
}

export default {
  install,
};
