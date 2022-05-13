<template>
  <div>
    <el-radio
      v-for="c in field.choices"
      :value="value"
      @input="input"
      :key="c.value"
      :label="c.value"
      :disabled="field.readonly"
    >
      {{c.label}}
    </el-radio>
  </div>
</template>

<script>
import basic from './basic';
export default basic();
</script>
