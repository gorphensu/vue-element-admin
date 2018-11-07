<template>
  <el-form-item
    :rules="rules"
    :prop="prop"
    class="table-upload">
    <el-upload
      :show-file-list="false"
      :on-success="specUploadSuccessHandler"
      :before-upload="beforeSpecUploadHandler"
      class="spec-uploader"
      action="https://jsonplaceholder.typicode.com/posts/">
      <img v-if="inputValue" :src="inputValue" class="spec-photo">
      <i v-else class="el-icon-plus icon-plus"/>
    </el-upload>
  </el-form-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.value,
      rules: [{
        required: this.required,
        trigger: 'change',
        validator: (rule, value, callback, source) => {
          if (!this.inputValue && this.required) {
            return callback(' ')
          }
          callback()
        }
      }]
    }
  },
  methods: {
    specUploadSuccessHandler(response, file, fileList) {
      this.inputValue = file
      this.$emit('input', file)
    },
    beforeSpecUploadHandler() {
    }
  }
}
</script>
