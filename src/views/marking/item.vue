<template>
  <div class="marking-item" @click="clickHandler">
    <div class="main-section">
      <div class="icon">
        <i class="el-icon-tickets"/>
      </div>
      <div class="main">
        <div class="title">优惠券</div>
        <div class="tags">
          <span class="tag">提升转化率</span>
          <span class="tag">提升客单价</span>
        </div>
        <div class="level">推荐指数:&nbsp;&nbsp;
          <i class="el-icon-star-on"/>
          <i class="el-icon-star-on"/>
          <i class="el-icon-star-on"/>
          <i class="el-icon-star-on"/>
        </div>
      </div>
    </div>
    <div class="remark-section">提高客单价和转化率最高约&nbsp;&nbsp;<span class="tip">22.88%</span></div>
    <div class="remark-section">设置了优惠券的商品,会让消费者更有购买欲望,可有效帮助提升营业额哦~</div>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandler() {
      this.$emit('click', this)
    }
  }
}
</script>

