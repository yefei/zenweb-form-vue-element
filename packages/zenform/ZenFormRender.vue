<template>
  <el-form ref="form" :model="form" :rules="rules" :size="size" :label-position="labelPosition">
      <el-form-item
        v-for="item of layout"
        :key="item"
        :label="fields[item].label || item"
        :prop="item">
        <zen-field-render :field="fields[item]" v-model="form[item]" />
        <div v-if="errors && errors[item]" style="color:#F56C6C">{{errors[item]}}</div>
        <div v-if="fields[item].help" style="color:#909399">{{fields[item].help}}</div>
      </el-form-item>
      <slot name="footer">
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </slot>
  </el-form>
</template>

<script>
export default {
  name: 'zen-form-render',
  props: ['layout', 'fields', 'errors', 'size', 'labelPosition'],
  data() {
    return {
      rules: null,
      form: null,
    }
  },
  created() {
    const form = {};
    const rules = {};
    for (const [k, o] of Object.entries(this.fields)) {
      form[k] = o.default || '';
      if (!rules[k]) rules[k] = [];
      if (o.required) {
        // 必填项
        rules[k].push({ required: true, message: typeof o.required === 'string' ? o.required : '必填项', trigger: 'blur' });
      }
      if (o.validate) {
        // 长度验证
        if (o.validate.maxLength || o.validate.minLength) {
          const _lenObj = { trigger: 'blur' };
          o.validate.maxLength && (_lenObj['max'] = o.validate.maxLength);
          o.validate.minLength && (_lenObj['min'] = o.validate.minLength);
          rules[k].push(_lenObj);
        }
      }
    }
    this.form = form;
    this.rules = rules;
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form);
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>
