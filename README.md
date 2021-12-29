# ZenWeb Form Render for VUE Element UI

只需要一行代码即可完成表单渲染，所有表单项都由服务端返回，减轻前端重复工作。

插槽:
- footer-prepend
- footer-append


main.js
```javascript
import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from 'axios';
import ZenForm from '@zenweb/form-vue-element';

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
```

```html
<template>
  <div v-loading="loading">
    <zen-form-render
      v-if="layout && fields"
      :layout="layout"
      :fields="fields"
      :errors="errors"
      size="small"
      @submit="submit"
      @cancel="cancel">
    </zen-form-render>
    <div v-else class="loading">正在载入表单</div>
  </div>
</template>

<style>
.loading {
  text-align: center;
  line-height: 300px;
}
</style>

<script>
export default {
  name: 'zen-form-api',
  props: ['url'],
  data() {
    return {
      loading: true,
      layout: null,
      fields: null,
      errors: null,
    }
  },
  async mounted() {
    try {
      const data = await this.$api.get(this.url);
      this.layout = data.layout;
      this.fields = data.fields;
    } catch (e) {
      this.$message.error(e);
      this.$emit('cancel');
    }
    this.loading = false;
  },
  methods: {
    submit(data) {
      this.$api.post(this.url, data).then(r => {
        this.$message.success('提交完成');
        this.$emit('success', r);
      }, e => {
        this.errors = e.data.errors;
        this.$message.error('表单错误，请检查输入项');
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>
```

App.vue
```html
<template>
  <zen-form-api url="http://localhost:7001/form" @cancel="" @success="" />
</template>
```
