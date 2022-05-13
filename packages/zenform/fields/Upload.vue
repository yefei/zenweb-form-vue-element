<template>
  <el-upload
    :action="field.action"
    :multiple="field.limit > 1"
    :limit="field.limit"
    :on-exceed="handleExceed"
    :on-success="success"
    :on-remove="remove"
    :before-upload="isReadonly"
    :before-remove="isReadonly"
    :headers="$zenfrom.upload && $zenfrom.upload.headers && $zenfrom.upload.headers()"
    :data="$zenfrom.upload && $zenfrom.upload.data && $zenfrom.upload.data()"
    :file-list="fileList">
    <el-button size="small" type="primary" :disabled="field.readonly">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  props: ['field', 'value'],
  computed: {
    fileList() {
      let value = this.value;
      if (!value) return [];
      if (typeof value === 'string') {
        value = [value];
      }
      return value.map(i => ({ name: i, url: i }))
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.field.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    isReadonly() {
      if (this.field.readonly) return false;
      return true;
    },
    success(response) {
      this.$emit('input', response.data.url);
    },
    remove() {
      this.$emit('input', '');
    },
  }
};
</script>
