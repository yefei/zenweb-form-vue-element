# ZenWeb Form Render for VUE Element UI

main.js
```javascript
import axios from 'axios';
import ZenForm from '@zenweb/form-vue-element';

Vue.use(ZenForm);
Vue.prototype.$api = axios.create(); // <zen-form-api>
```

App.vue
```html
<template>
  <zen-form-api url="http://localhost:7001/form" @cancel="" @success="" />
</template>
```
