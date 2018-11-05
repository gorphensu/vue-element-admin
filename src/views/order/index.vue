<template>
  <div class="order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item>订单查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 快速筛选订单状态： -->
    <section class="fast-selection">
      快速筛选订单状态：
      <el-radio v-model="fastSearchType" label="1" border>待发货（5）</el-radio>
      <el-radio v-model="fastSearchType" label="2" border>已发货待签收（63）</el-radio>
      <el-radio v-model="fastSearchType" label="3" border>已确认收货（23）</el-radio>
    </section>

    <!-- 条件筛选 -->
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.orderId" placeholder=""/>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input v-model="searchForm.productId" placeholder=""/>
        </el-form-item>
        <el-form-item label="收货手机：">
          <el-input v-model="searchForm.receiveMobile" placeholder=""/>
        </el-form-item>
        <el-form-item label="快递单号：">
          <el-input v-model="searchForm.expressCode" placeholder=""/>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="searchForm.orderStatus" placeholder="">
            <el-option label="全部" value="0"/>
            <el-option label="待发货" value="1"/>
            <el-option label="已发货" value="2"/>
            <el-option label="已签收" value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="售后状态：">
          <el-select v-model="searchForm.afterSaleStatus" placeholder="">
            <el-option label="全部" value="1"/>
            <el-option label="仅退款" value="2"/>
            <el-option label="退款退货" value="3"/>
            <el-option label="换货" value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item label="收件人姓名：">
          <el-input v-model="searchForm.receiveName" placeholder=""/>
        </el-form-item>
        <el-form-item label="拼单成功时间：" class="daterange-form-item">
          <el-date-picker v-model="searchForm.startTime" type="datetime" value-format="timestamp" format="yyyy-MM-dd HH:mm" placeholder=""/>
          <span> - </span>
          <el-date-picker v-model="searchForm.endTime" type="datetime" value-format="timestamp" format="yyyy-MM-dd HH:mm" placeholder=""/>
        </el-form-item>
        <div class="btn-container">
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </div>
      </el-form>
    </div>

    <!-- 列表 -->
    <div class="list-container">
      <el-table v-if="tableHeight" :height="tableHeight" :data="tableData" border style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" align="center" width="200"/>
        <el-table-column prop="product" label="订单商品" align="center" width="300"/>
        <el-table-column prop="orderAmount" label="订单金额" align="center" width="200"/>
        <el-table-column prop="freightType" label="运费方式" align="center" width="200"/>
        <el-table-column :formatter="orderStatusFormatter" prop="orderStatus" label="订单状态" align="center" width="200"/>
        <el-table-column prop="buyer" label="买家" align="center" width="200"/>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200"/>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="60">
          <template slot-scope="scope">
            <el-button type="text"><i class="el-icon-edit-outline"/></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :current-page="page.index"
          :page-size="page.pageSize"
          :total="page.totalCount"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentPageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import * as OrderAPI from '../../api/order'
export default {
  data() {
    return {
      fastSearchType: '',
      searchForm: {},
      tableData: [],
      page: {
        index: 1,
        totalCount: 0, // 总数
        pageSize: 25 // 每页数量
      },
      tableHeight: 0
    }
  },
  beforeCreate() {
    this.searchParams = {}
  },
  created() {
    this.getData({
      ...this.searchParams,
      pageIndex: this.page.index,
      pageSize: this.page.pageSize
    })
  },
  beforeMount() {
    this.tableHeight = document.body.clientHeight - 80
  },
  methods: {
    onSearch() {
      this.searchParams = JSON.parse(JSON.stringif(this.searchForm))
      this.getData({
        ...this.this.searchParams,
        pageIndex: this.page.index,
        pageSize: this.page.pageSize
      })
    },
    getDataPromise(obj) {
      return OrderAPI.fetchList(obj)
    },
    getData(obj) {
      this.getDataPromise(obj).then(response => {
        this.tableData = response.data.data || []
        this.page.totalCount = response.data.totalCount || 0
      }).catch(error => {
        console.error(error)
      })
    },
    handleCurrentPageChange(val) {
      this.page.index = val
      this.getData({
        ...this.searchParams,
        pageIndex: this.page.index,
        pageSize: this.page.pageSize
      })
    },
    resetParams() {
      this.searchParams = {}
    },
    orderStatusFormatter(row, column, cellValue, index) {
      const statusTextMap = {
        1: '待发货',
        2: '已发货',
        3: '已签收'
      }
      return statusTextMap[cellValue]
    }
  }
}
</script>
