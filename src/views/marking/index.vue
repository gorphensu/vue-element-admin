<template>
  <div class="marking-container order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item>营销工具</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="block">
      <div class="item">
        <div class="content">
          <item @click="goToCoupon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item'
export default {
  components: {
    Item
  },
  data() {
    return {}
  },
  methods: {
    goToCoupon() {
      this.$router.push({ path: `/marking/coupon` })
    }
  }
}
</script>
