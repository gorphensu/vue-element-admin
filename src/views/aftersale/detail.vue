<template>
  <div class="order-container order-detail">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/order/index'}">订单查询</el-breadcrumb-item>
      <el-breadcrumb-item>编辑订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="order-message">
      <div>
        <label>订单状态:</label>
        <span class="order-status">待发货</span>
      </div>
      <div>
        <label>订单号:</label>
        <span>2323434982847478</span>
      </div>
      <el-button type="default" @click="deliveryHandler">发货</el-button>
    </div>
    <div class="product-detail">
      <div class="title">商品详情</div>
      <div class="detail">
        <img src="../order/images/default.png">
        <div class="product"><span>端蛮双面穿短外套女装春哥求韩版休闲百搭大码胖妹小外衣【红色 500g】 X 3</span></div>
      </div>
      <div class="remark">
        <label>备注:</label>
        <div>麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！麻烦尽快发货，亲！</div>
      </div>
    </div>
    <div class="other-container">
      <div class="item">
        <div class="title">
          收货人
        </div>
        <div class="content">
          <span>收货人: 林先生</span><br><br>
          <span>收货地址: 广东省广州市天河区金穗路200号2202</span><br><br>
          <span>手机号码: 156220395486</span>
        </div>
      </div>
      <div class="item">
        <div class="title">
          付款金额
        </div>
        <div class="content">
          <span>付款时间: 2018-10-27 08:37:17</span><br><br>
          <span>订单总价: ￥999.00</span><br><br>
          <span>运费: ￥ 0.00</span><br><br>
          <span>总优惠: ￥ 12.00</span><br><br>
          <span>优惠券优惠: ￥ 12.00</span><br><br>
          <span>e币: ￥ 0</span><br><br>
          <span>实付: ￥ 987.00</span>
        </div>
      </div>
      <div class="item">
        <div class="title">
          配送信息
        </div>
        <div class="content">
          <span>运费模板: 默认运费模板</span><br><br>
          <span>运费: ￥0.00</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AfterSaleAPI from '../../api/aftersale'

export default {
  data() {
    return {}
  },
  created() {
    // this.$route.params.id
    this.getData({
      id: this.$route.params.id
    })
  },
  methods: {
    getData(id) {
      AfterSaleAPI.fetchDetail(id).then(response => {
        const data = response.data
        console.log(data)
      }).catch(error => {
        console.error(error)
      })
    },
    deliveryHandler() {
    }
  }
}
</script>
