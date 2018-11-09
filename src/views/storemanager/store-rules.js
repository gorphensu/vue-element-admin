export default {
  logo: {
    required: true,
    message: '请选择图片上传',
    trigger: 'change',
    validator(rule, value, callback) {
      if (!value) {
        callback('请选择图片上传')
      } else {
        callback()
      }
    }
  },
  desc: {
    required: true,
    message: '请输入店铺详情'
  },
  email: {
    required: true,
    trigger: 'blur',
    message: '请输入入驻人邮箱',
    type: 'email'
  },
  mobile: {
    required: true,
    trigger: 'blur',
    validator(rule, value, callback) {
      if (!value) {
        callback('请输入入驻人手机号')
      } else {
        const reg = /1\d{10}/g
        if (!reg.test(value)) {
          callback('入驻人手机号格式不符合')
        }
      }
    }
  },
  contactMobile: {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (value) {
        const reg = /1\d{10}/g
        if (!reg.test(value)) {
          callback('入驻人手机号格式不符合')
        }
      }
    }
  }
}
