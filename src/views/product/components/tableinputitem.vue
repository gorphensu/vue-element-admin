<template>
  <el-form-item
    :rules="rules"
    :prop="prop"
    class="table-input">
    <el-input v-model="inputValue" @change="changeHandler"/>
  </el-form-item>
</template>

<script>
export default {
  // props: ['value', 'prop'],
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
        trigger: 'blur',
        validator: (rule, value, callback, source) => {
          if (!this.inputValue && this.required) {
            return callback(' ')
          }
          callback()
        }
      }]
    }
  },
  created() {
  },
  methods: {
    changeHandler(value) {
      this.inputValue = value
      this.$emit('input', value)
    }
  }
}
</script>

