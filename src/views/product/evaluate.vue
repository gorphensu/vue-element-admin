<template>
  <div class="evaluate-container order-container">
    <!-- 条件筛选 -->
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品ID">
          <el-input v-model="searchForm.productId" placeholder=""/>
        </el-form-item>
        <el-form-item label="评价时间" class="date-range">
          <DateRange v-model="searchForm.evaluateTime"/>
        </el-form-item>
        <div>
          <el-form-item label="商品评价" class="multi-select">
            <el-select v-model="searchForm.evaluationLevel" multiple clearable>
              <el-option
                v-for="item in levelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流服务" class="multi-select">
            <el-select v-model="searchForm.feightLevel" multiple clearable>
              <el-option
                v-for="item in levelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务态度" class="multi-select">
            <el-select v-model="searchForm.serviceLevel" multiple clearable>
              <el-option
                v-for="item in levelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="btn-container">
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </div>
      </el-form>
    </div>
    <br>
    <!-- 列表 -->
    <div class="list-container">
      <el-table v-if="tableHeight" :height="tableHeight" :data="tableData" border style="width: 100%">
        <el-table-column prop="productName" label="商品名称" align="center" width="300"/>
        <el-table-column prop="evaluation" label="评价内容" align="center"/>
        <el-table-column prop="evaluationLevel" label="商品评分" align="center" width="80"/>
        <el-table-column prop="feightLevel" label="物流服务" align="center" width="80"/>
        <el-table-column prop="serviceLevel" label="服务态度" align="center" width="80"/>
        <el-table-column prop="createTime" label="创建时间" align="center" width="160"/>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" @click="goToDetail(scope.row)">查看</el-button>
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
import DateRange from './components/daterange'
import * as ProductAPI from '../../api/product'
export default {
  components: {
    DateRange
  },
  data() {
    return {
      levelOptions: [{
        id: '1',
        name: '1分'
      }, {
        id: '2',
        name: '2分'
      }, {
        id: '3',
        name: '3分'
      }, {
        id: '4',
        name: '4分'
      }, {
        id: '5',
        name: '5分'
      }],
      searchForm: {
        productId: '',
        evaluateTime: [],
        evaluationLevel: [],
        feightLevel: [],
        serviceLevel: []
      },
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
      this.searchParams = JSON.parse(JSON.stringify(this.searchForm))
      this.getData({
        ...this.this.searchParams,
        pageIndex: this.page.index,
        pageSize: this.page.pageSize
      })
    },
    getData(obj) {
      ProductAPI.fetchEvaluateList(obj).then(response => {
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
      // this.$router.push({ path: `/order/detail/${row.orderId}` })
    }
  }
}
</script>
