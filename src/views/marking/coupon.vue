<template>
  <div class="coupon-container order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/marking/index'}">营销工具</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="header-container">
      <div class="icon">
        <i class="el-icon-tickets"/>
      </div>
      <div class="main">
        <div class="title">优惠券</div>
        <div class="remark-section">包括店铺优惠券和商品优惠券,平台优质商家都在使用,平均提高客单价和转化率30%</div>
        <div class="tags">
          <el-button type="danger" size="mini"><i class="el-icon-plus"/>创建店铺优惠券</el-button>
          <el-button type="danger" size="mini"><i class="el-icon-plus"/>创建商品优惠券</el-button>
        </div>
      </div>
    </div>
    <br>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="店铺优惠券" name="store">
        <StoreList v-if="activeTab === 'store'"/>
      </el-tab-pane>
      <el-tab-pane label="商品优惠券" name="product">
        <ProductList v-if="activeTab === 'product'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StoreList from './storelist'
import ProductList from './productlist'
export default {
  components: {
    StoreList,
    ProductList
  },
  data() {
    return {
      activeTab: 'store'
    }
  }
}
</script>

<style>

</style>
