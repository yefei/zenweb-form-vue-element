<template>
  <el-date-picker
    type="datetime"
    :value="value"
    @input="input"
    :placeholder="field.placeholder"
    :disabled="field.readonly"
  />
</template>

<script>
import basic from './basic';
export default basic();
</script>
