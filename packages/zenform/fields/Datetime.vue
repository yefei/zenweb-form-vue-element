<template>
  <el-date-picker
    type="datetime"
    :value="value"
    @input="input"
    :placeholder="field.placeholder" />
</template>

<script>
import basic from './basic';
export default basic();
</script>
