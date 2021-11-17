import ZenFormApi from './ZenFormApi.vue';
import ZenFormRender from './ZenFormRender.vue';

const components = [
  ZenFormApi,
  ZenFormRender,
];

function install(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
};
