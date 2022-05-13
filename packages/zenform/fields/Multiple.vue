<template>
  <el-select
    :value="value"
    @input="input"
    :placeholder="field.placeholder"
    :disabled="field.readonly"
    multiple
    >
    <el-option
      v-for="c in field.choices"
      :key="c.value"
      :label="c.label"
      :value="c.value"
      :disabled="c.disabled"
    />
  </el-select>
</template>

<script>
import basic from './basic';
export default basic();
</script>
