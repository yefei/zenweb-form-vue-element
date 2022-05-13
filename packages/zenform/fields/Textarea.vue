<template>
  <el-input
    type="textarea"
    :rows="field.rows !== 'auto' && field.rows.min ? field.rows.min : 2"
    :autosize="field.rows === 'auto' ? true : { minRows: field.rows.min, maxRows: field.rows.max }"
    :value="value"
    @input="input"
    :maxlength="field.validate && field.validate.maxLength"
    :minlength="field.validate && field.validate.minLength"
    :show-word-limit="field.validate && field.validate.maxLength > 0"
    :placeholder="field.placeholder"
    :disabled="field.readonly"
  />
</template>

<script>
import basic from './basic';
export default basic();
</script>
