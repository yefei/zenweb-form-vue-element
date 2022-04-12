<template>
  <el-autocomplete
      :value="value"
      @input="input"
      :fetch-suggestions="fetch"
      :maxlength="field.validate && field.validate.maxLength"
      :minlength="field.validate && field.validate.minLength"
      :show-word-limit="field.validate && field.validate.maxLength > 0"
      :placeholder="field.placeholder" 
  />
</template>

<script>
export default {
  props: ['field', 'value'],
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    fetch(search, cb) {
       this.$zenfrom.request('GET', this.field.fetchUrl + '?search=' + encodeURI(search)).then(data => {
         cb(data.list.map(value => ({ value })));
       });
    },
  }
};
</script>
