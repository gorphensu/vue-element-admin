<template>
  <div class="index-container">
    <div class="plan-container">
      <img src="./images/u158.png">
    </div>
    <div class="simple-total-container">
      <SimpleTotal background-color="#8ad0ff" title="全部订单" count="55"/>
      <SimpleTotal background-color="#dff2ff" title="待发货订单" count="55"/>
      <SimpleTotal background-color="#dff2ff" title="已发货待签收" count="55"/>
      <SimpleTotal background-color="#dff2ff" title="已确认收货" count="55"/>
      <SimpleTotal background-color="#dff2ff" title="退款 / 退货处理" count="55"/>
      <SimpleTotal background-color="#dff2ff" title="换货处理" count="55"/>
    </div>
    <div class="simple-total-container">
      <SimpleTotalWithIcon :icon="u4Image" count="555" background-color="#ffdbdb" theme-background-color="#ff7373" title="营销活动" theme="参与营销，提高单量"/>
      <SimpleTotal background-color="#ffdbdb" title="已发布优惠券" count="55"/>
      <SimpleTotalFree background-color="#f2f2f2">
        <div class="total-count">
          <div class="total-title">今日成交额</div>
          <div class="total-size"><span class="count">9870</span> <span>&nbsp;元</span></div>
        </div>
        <div class="total-count">
          <div class="total-title">近30天成交金额</div>
          <div class="total-size"><span class="count">9870</span> <span>&nbsp;元</span></div>
        </div>
        <div class="total-count">
          <div class="total-title">近30天成交单量</div>
          <div class="total-size"><span class="count">9870</span> <span>&nbsp;元</span></div>
        </div>
      </SimpleTotalFree>
    </div>
  </div>
</template>

<script>
import SimpleTotal from './components/SimpleTotal'
import SimpleTotalWithIcon from './components/SimpleTotalWithIcon'
import SimpleTotalFree from './components/SimpleTotalFree'
import u4Image from './images/u4.png'

export default {
  name: 'Index',
  components: {
    SimpleTotal,
    SimpleTotalWithIcon,
    SimpleTotalFree
  },
  data() {
    return {
      u4Image
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index-container {
    .plan-container {
      img {
        width: 100%;
      }
    }
    .simple-total-container {
      display: flex;
      padding-top: 5px;
      padding-bottom: 10px;
      // flex-grow: 0;
      // justify-content: space-between;
      .simple-total {
      }
      .total-count {

        .total-title {
          float: left;
          color: #999999;
          padding: 5px 0px;
        }
        .total-size {
          float: right;
          padding: 5px 0px;
          .count {
            color: red;
          }
        }
      }
    }
  }
</style>

