<template>
  <div :style="{'background-color': backgroundColor}" class="simple-total">
    <div class="title">{{ title }}</div>
    <div>{{ count }}<span class="unit">&nbsp;单</span></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    count: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-total {
  padding: 20px;
  width: 157px;
  height: 94px;
  margin-right: 15px;
  .title {
    margin-bottom: 15px;
  }
  .unit {
    font-size: 12px;
  }
}
</style>
