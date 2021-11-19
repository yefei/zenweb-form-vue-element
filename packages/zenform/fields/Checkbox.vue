<template>
  <el-checkbox-group :value="value" @input="input">
    <el-checkbox v-for="c in field.choices" :key="c.value" :label="c.label" :value="c.value" />
  </el-checkbox-group>
</template>

<script>
import basic from './basic';
export default basic();
</script>
