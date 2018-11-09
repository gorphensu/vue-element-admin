<template>
  <div class="store-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="店铺信息" name="storemessage">
        <Store/>
      </el-tab-pane>
      <el-tab-pane label="资质信息" name="qualification">
        <Qualification/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Store from './store'
import Qualification from './qualification'
export default {
  components: {
    Store,
    Qualification
  },
  data() {
    return {
      activeTab: 'storemessage'
    }
  }
}
</script>
