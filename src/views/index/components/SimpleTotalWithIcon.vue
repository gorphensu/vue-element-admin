<template>
  <div :style="{'background-color': backgroundColor}" class="simple-total2">
    <div :style="{'background-color': themeBackgroundColor}" class="theme" >
      {{ theme }}
    </div>
    <div class="body">
      <img :src="icon" class="icon">
      <div class="title-container">
        <div class="title">{{ title }}</div>
        <div>{{ count }}<span class="unit">&nbsp;单</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    },
    themeBackgroundColor: {
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
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-total2 {
  // padding: 20px;
  width: 218px;
  height: 94px;
  margin-right: 15px;
  padding-top: 0px;
  .theme {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    padding-left: 10px;
  }
  .title {
    margin-bottom: 15px;
  }
  .unit {
    font-size: 12px;
  }
  .icon {
    width: 33px;
    height: 33px;
  }
  .body {
    padding-left: 20px;
  }
  .title-container {
    display: inline-block;
    padding-top: 10px;
    padding-left: 10px;
  }
}
</style>
