<template>
  <el-checkbox-group
    :value="value"
    @input="input"
    :disabled="field.readonly"
  >
    <el-checkbox v-for="c in field.choices" :key="c.value" :label="c.label" :value="c.value" :disabled="c.disabled" />
  </el-checkbox-group>
</template>

<script>
import basic from './basic';
export default basic();
</script>
