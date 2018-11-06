<template>
  <div class="product-container order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-alert title="请确保提交的商品负荷国家法律法规,不得包含围巾商品.平台将随时进行抽审,一经发现,将对商品和店铺进行处理,严重将追究责任." type="warning" show-icon />
    <br>
    <!-- 条件筛选 -->
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品ID：">
          <el-input v-model="searchForm.productId" placeholder=""/>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model="searchForm.productCode" placeholder=""/>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="searchForm.productName" placeholder=""/>
        </el-form-item>
        <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
      </el-form>
    </div>
    <br>
    <el-radio-group v-model="searchType">
      <el-radio-button label="0">全部</el-radio-button>
      <el-radio-button label="1">上架</el-radio-button>
      <el-radio-button label="2">售罄</el-radio-button>
      <el-radio-button label="3">下架</el-radio-button>
    </el-radio-group>

    <!-- 列表 -->
    <div class="list-container">
      <el-table v-if="tableHeight" :height="tableHeight" :data="tableData" border style="width: 100%">
        <el-table-column prop="productId" label="商品ID" align="center" width="180"/>
        <el-table-column prop="productName" label="商品名称" align="center" width="300"/>
        <el-table-column prop="singlePrice" label="单购价" align="center" width="100"/>
        <el-table-column prop="teamPrice" label="团购价" align="center" width="100"/>
        <el-table-column prop="status" label="在售状态" align="center" width="100"/>
        <el-table-column prop="createTime" label="创建时间" align="center" width="180"/>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="60">
          <template slot-scope="scope">
            <el-button type="text"><i class="el-icon-edit-outline" @click="goToDetail(scope.row)"/></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
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
import * as ProductAPI from '../../api/product'

export default {
  data() {
    return {
      searchForm: {
        productId: '',
        productCode: '',
        productName: ''
      },
      page: {
        index: 1,
        totalCount: 0, // 总数
        pageSize: 25 // 每页数量
      },
      searchType: '0',
      tableData: [],
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
    getData(obj) {
      ProductAPI.fetchList(obj).then(response => {
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
    goToDetail(row) {
      this.$router.push({ path: `/product/detail/${row.productId}` })
    }
  }
}
</script>
