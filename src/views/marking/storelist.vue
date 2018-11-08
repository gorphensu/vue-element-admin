<template>
  <div class="store-container">
    <!-- 快速筛选订单状态： -->
    <section class="fast-selection">
      <el-select v-model="searchType" placeholder="">
        <el-option
          v-for="item in selectTypeOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          @change="selectTypeHandler"/>
      </el-select>
      共查询到&nbsp;<span class="tip">{{ tableData.length }}</span>&nbsp;条数据
    </section>
    <br>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="couponName"
        label="优惠券名称"
        min-width="150" />
      <el-table-column
        prop="amount"
        label="面额"
        width="80" />
      <el-table-column
        prop="threshold"
        label="门槛"
        width="150" />
      <el-table-column
        prop="channel"
        label="推广渠道"
        width="100" />
      <el-table-column
        prop="activeTime"
        label="活动时间"
        width="185" />
      <el-table-column
        prop="releaseCount"
        label="发行量"
        width="70" />
      <el-table-column
        prop="receiveCount"
        label="领取量"
        width="70" />
      <el-table-column
        prop="usedCount"
        label="使用量"
        width="70" />
      <el-table-column
        prop="staus"
        label="状态"
        width="80" />
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteHandler(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as CouponAPI from '../../api/coupon'
export default {
  data() {
    return {
      selectTypeOptions: [{
        id: '0',
        name: '全部'
      }],
      searchType: '',
      tableData: []
    }
  },
  created() {
    this.searchType = this.selectTypeOptions[0].id
    this.getData()
  },
  methods: {
    getData() {
      CouponAPI.fetchList({
        type: this.searchType
      }).then(response => {
        this.tableData = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    selectTypeHandler(val) {
      this.getData()
    },
    deleteHandler(row) {
    },
    goDetail(row) {
    }
  }
}
</script>

<style>

</style>
