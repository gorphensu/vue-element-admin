<template>
  <div :style="{'background-color': backgroundColor}" class="simple-total-free">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-total-free {
  padding: 20px;
  width: 280px;
  height: 94px;
  margin-right: 15px;
  padding-top: 6px;
}
</style>
