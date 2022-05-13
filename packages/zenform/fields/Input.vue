<template>
  <el-input
    :value="value"
    @input="input"
    :maxlength="field.validate && field.validate.maxLength"
    :minlength="field.validate && field.validate.minLength"
    :show-word-limit="field.validate && field.validate.maxLength > 0"
    :disabled="field.readonly"
    :placeholder="field.placeholder"
  />
</template>

<script>
import basic from './basic';
export default basic();
</script>
