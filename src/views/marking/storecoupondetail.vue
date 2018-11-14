<template>
  <div class="storecoupon-detail-container order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/marking/index'}">营销工具</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/marking/coupon'}">优惠券</el-breadcrumb-item>
      <el-breadcrumb-item>店铺优惠券</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- {{ baseForm }} -->
    <el-form ref="form" :model="baseForm" label-width="120px" size="small">
      <el-form-item label="推广渠道" prop="channel" class="form-item-margin-bottom-0">
        <el-radio-group v-model="baseForm.channel" size="small" class="checkbox-radio-group">
          <el-radio v-for="option in channelOptions" :key="option.id" :label="option.id" border>{{ option.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <span class="detail-msg">{{ channelTip }}</span>
      </el-form-item>

      <el-form-item label="优惠券名称" prop="name">
        <el-input v-model="baseForm.name" />
      </el-form-item>
      <el-form-item label="使用有效期" prop="expiryDate">
        <el-date-picker
          v-model="baseForm.expiryDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"/>
      </el-form-item>
      <el-form-item class="expire-date-remark-item">
        <span class="expire-date-remark">活动持续时间: {{ expiryRangeDay }}天</span>
      </el-form-item>
      <el-form-item label="面额" prop="denomination">
        <el-select v-model="baseForm.denomination" placeholder="">
          <el-option
            v-for="option in denominationOptions"
            :key="option.id"
            :label="option.name"
            :value="option.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="condition-item" label="使用条件" prop="condition">
        <span class="condition-left">满&nbsp;</span>
        <el-input v-model="baseForm.condition" placeholder="请填写正整数"/>
        <span class="condition-right">&nbsp;可使用</span>
      </el-form-item>
      <el-form-item label="发行张数" prop="releaseCount">
        <el-input v-model="baseForm.releaseCount" />
      </el-form-item>
      <el-form-item label="每人限额" prop="limit">
        <el-select v-model="baseForm.limit" placeholder="">
          <el-option
            v-for="option in limitOptions"
            :key="option.id"
            :label="option.name"
            :value="option.id"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">保存</el-button>
        <el-button type="default" size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channelOptions: [{
        id: '1',
        name: '公开',
        tip: '用户可以通过公开渠道主动领取优惠券,如店铺首页,商品详情页等'
      }, {
        id: '2',
        name: '短信营销',
        tip: '短信营销 用户可以通过公开渠道主动领取优惠券,如店铺首页,商品详情页等'
      }, {
        id: '3',
        name: '店铺收藏',
        tip: '店铺收藏 用户可以通过公开渠道主动领取优惠券,如店铺首页,商品详情页等'
      }, {
        id: '4',
        name: '非公开',
        tip: '非公开 用户可以通过公开渠道主动领取优惠券,如店铺首页,商品详情页等'
      }],
      denominationOptions: [{
        id: '1',
        name: '10元'
      }, {
        id: '2',
        name: '20元'
      }, {
        id: '3',
        name: '50元'
      }, {
        id: '4',
        name: '100元'
      }],
      limitOptions: [{
        id: '1',
        name: '10元'
      }, {
        id: '2',
        name: '20元'
      }, {
        id: '3',
        name: '50元'
      }, {
        id: '4',
        name: '100元'
      }],
      baseForm: {
        channel: '1',
        name: '',
        expiryDate: [],
        denomination: '',
        condition: '',
        releaseCount: '',
        limit: ''
      }
    }
  },
  computed: {
    expiryRangeDay() {
      if (this.baseForm.expiryDate[0] && this.baseForm.expiryDate[1]) {
        const timestamp = new Date(this.baseForm.expiryDate[1]).getTime() - new Date(this.baseForm.expiryDate[0]).getTime()
        const day = parseInt(timestamp / 1000 / 3600 / 24) + 1
        return day
      }
      return 0
    },
    channelTip() {
      if (!this.baseForm.channel) {
        return ''
      }
      return this.channelOptions.find(opt => {
        return opt.id === this.baseForm.channel
      }).tip
    }
  },
  created() {
    // 编辑
    if (this.$route.params.id) {
      console.log('编辑')
    } else {
      // 新增
    }
    // this.$route.params.id
  }
}
</script>
