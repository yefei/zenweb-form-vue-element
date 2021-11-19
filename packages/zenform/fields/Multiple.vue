<template>
  <el-select :value="value" @input="input" :placeholder="field.placeholder" multiple>
    <el-option
      v-for="c in field.choices"
      :key="c.value"
      :label="c.label"
      :value="c.value" />
  </el-select>
</template>

<script>
import basic from './basic';
export default basic();
</script>
