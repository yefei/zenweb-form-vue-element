<template>
  <el-form ref="form" :model="form" :rules="rules" size="small">
      <el-form-item
        v-for="item of layout"
        :key="item"
        :label="fields[item].label || item"
        :prop="item">

        <el-select v-if="fields[item].widget == 'Select'" v-model="form[item]">
          <el-option
            v-for="c in fields[item].choices"
            :key="c.value"
            :label="c.label"
            :value="c.value" />
        </el-select>

        <template v-else-if="fields[item].widget == 'Radio'">
          <el-radio v-for="c in fields[item].choices" :key="c.value" v-model="form[item]" :label="c.value">
            {{c.label}}
          </el-radio>
        </template>

        <el-select v-else-if="fields[item].widget == 'Multiple'" multiple v-model="form[item]">
          <el-option
            v-for="c in fields[item].choices"
            :key="c.value"
            :label="c.label"
            :value="c.value" />
        </el-select>

        <el-checkbox-group v-else-if="fields[item].widget == 'Checkbox'" v-model="form[item]">
          <el-checkbox v-for="c in fields[item].choices" :key="c.value" :label="c.label" :value="c.value" />
        </el-checkbox-group>

        <el-date-picker v-else-if="fields[item].type == 'date'" v-model="form[item]" type="date" />

        <el-input
          v-else
          v-model="form[item]"
          :maxlength="fields[item].validate && fields[item].validate.maxLength"
          :minlength="fields[item].validate && fields[item].validate.minLength"
          :show-word-limit="fields[item].validate && fields[item].validate.maxLength > 0"
          :placeholder="fields[item].placeholder" />

        <div v-if="errors && errors[item]" class="form-error">{{errors[item]}}</div>
        <div v-if="fields[item].help" class="form-help">{{fields[item].help}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
  </el-form>
</template>

<style>
.form-help {
  color: #909399;
  font-size: 12px;
}
.form-error {
  color: #F56C6C;
  font-size: 12px;
}
</style>

<script>
export default {
  name: 'zen-form-render',
  props: ['layout', 'fields', 'errors'],
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
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form);
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
}
</script>
