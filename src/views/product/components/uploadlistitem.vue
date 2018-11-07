<template>
  <el-form-item :rules="rules" :label="label" :prop="prop">
    <el-upload
      :disabled="maxLength && (fileList.length >= maxLength)"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :on-error="handleUploadError"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card">
      <i class="el-icon-plus"/>
      <div v-show="maxLength" class="mark">({{ fileList.length }}/{{ maxLength }})</div>
    </el-upload>
  </el-form-item>
</template>

<script>
export default {
  props: {
    label: {
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
    },
    maxLength: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      fileList: this.value, // [{name: url}]
      rules: [{
        required: this.required,
        trigger: 'change',
        validator: (rule, value, callback, source) => {
          debugger
          if (!this.fileList.length && this.required) {
            return callback(' ')
          }
          if (this.maxLength && this.fileList.length > this.maxLength) {
            return callback('当前允许上传图片数量:' + this.maxLength)
          }
          callback()
        }
      }]
    }
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
    },
    handleBeforeUpload(file) {
      // this.fileList.push({
      //   name: file.name,
      //   url: file.url
      // })
      // this.$emit('input', this.fileList)
    },
    handleUploadError(err, file, fileList) {
      console.error(err)
    },
    handleUploadSuccess(response, file, fileList) {
      // TODO需要改变this.fileList
      // TODO 改变this.value
      // TODO
      this.fileList.push({
        name: file.name,
        url: file.url
      })
      this.$emit('input', this.fileList)
    }
  }
}
</script>
