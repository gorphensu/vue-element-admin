<template>
  <div class="store-message">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">
      <el-form-item label="店铺编号:">
        <span class="detail-msg">
          {{ form.storeNum }}
        </span>&nbsp;
        <el-popover
          placement="right"
          width="128"
          trigger="hover">
          <img :src="form.qrcode" class="qrcode">
          <el-button slot="reference" type="text">二维码</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="店铺名称:">
        <span class="detail-msg">
          {{ form.storeName }} &nbsp;<i class="el-icon-question" />
        </span>
      </el-form-item>
      <el-form-item label="店铺认证:">
        <span class="detail-msg">
          {{ form.storeType }}
        </span>
      </el-form-item>
      <el-form-item label="主营类目:">
        <span class="detail-msg">
          {{ form.category }} <el-button type="text">更改主营类目</el-button>
          <el-button type="text">有疑问?</el-button>
        </span>
      </el-form-item>
      <el-form-item label="招商对接联系方式:">
        <span class="detail-msg">
          <el-button type="text">查看</el-button>
        </span>
      </el-form-item>
      <el-form-item label="第三个平台店铺:">
        <span class="detail-msg">
          <el-button type="danger" size="mini">累计全网销量</el-button>
          <el-popover
            ref="thirdStorePopover"
            placement="right"
            width="250"
            trigger="click">
            <div>
              <span>绑定第三个店铺,即可累计全网销量,能够大幅提升您的店铺流量!</span><br>
              <el-button type="danger" size="mini" @click="closeThirdStorePopover">我知道了</el-button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button ref="thirdpartBtn" slot="reference" type="text">&nbsp;</el-button>
          </el-popover>
        </span>
      </el-form-item>
      <el-form-item label="店铺Logo:" prop="logo">
        <el-upload
          :show-file-list="false"
          :on-success="handleUploadLogoSuccess"
          class="logo-uploader"
          action="https://jsonplaceholder.typicode.com/posts/">
          <img v-if="form.logo" :src="form.logo" class="logo">
          <i v-else class="el-icon-plus logo-uploader-icon"/>
        </el-upload>
        <el-button type="text">店铺Logo上传规则</el-button>
      </el-form-item>
      <el-form-item label="店铺详情:" prop="desc">
        <el-input v-model="form.desc" rows="5" type="textarea"/>
      </el-form-item>
      <el-form-item label="入驻人邮箱:" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="入驻人手机:" prop="mobile">
        <el-input v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="紧急联系人姓名:" prop="contactName" class="width200input">
        <el-input v-model="form.contactName"/>
      </el-form-item>
      <el-form-item label="紧急联系人手机:" prop="contactMobile" class="width200input">
        <el-input v-model="form.contactMobile"/>
        <el-button type="default">获取验证码</el-button>
      </el-form-item>
      <el-form-item :rules="validateRules" label="验证码:" prop="validateCode" class="width200input">
        <el-input v-model="form.validateCode"/>
      </el-form-item>
      <el-form-item label="" prop="accept" class="accept">
        <el-checkbox v-model="form.acept">
          我声明,此页面内容由本店自行填写和发布,内容真实有效,如有相关法律法规,平台协议及平台规则之规定冲突,以法律法规,平台协议及平台规则规定为准.
        </el-checkbox>
      </el-form-item>
      <el-form-item label="" prop="accept" class="accept">
        <el-button type="primary" @click="saveHandler">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import StoreRules from './store-rules'
export default {
  data() {
    return {
      form: {
        storeNum: '320661366',
        qrcode: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1750833952,2529388352&fm=58&bpow=380&bpoh=380',
        storeName: '邵晓宇的店铺',
        storeType: '个人店铺',
        category: '水果生鲜',
        logo: '',
        desc: '',
        email: '',
        mobile: '',
        contactName: '',
        contactMobile: '',
        validateCode: '',
        acept: false
      },
      rules: StoreRules
    }
  },
  computed: {
    validateRules() {
      const tmp = {
        message: '请输入验证码',
        trigger: 'blur'
      }
      const rule = this.form.contactMobile ? {
        required: true,
        ...tmp
      } : {
        required: false,
        ...tmp
      }
      return rule
    }
  },
  mounted() {
    this.autoOpenThirdStoreShow()
  },
  methods: {
    autoOpenThirdStoreShow() {
      const thirdBtnEl = this.$refs['thirdpartBtn'].$el
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, false)
      thirdBtnEl.dispatchEvent(evt)
    },
    closeThirdStorePopover() {
      const thirdStorePopover = this.$refs['thirdStorePopover']
      thirdStorePopover.doClose()
    },
    handleUploadLogoSuccess(response, file, fileList) {
      this.form.logo = file
    },
    saveHandler() {
      this.$refs['form'].validate(res => {
        debugger
      })
    }
  }
}
</script>
