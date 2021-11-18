import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import ZenForm from '../packages/zenform';

Vue.use(ElementUI);
Vue.use(ZenForm);

const request = axios.create();
request.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data);
  }
);
Vue.prototype.$api = request;

new Vue({
  render: h => h(App),
}).$mount('#app')