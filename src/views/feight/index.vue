<template>
  <div class="order-container feight-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item>运费模板</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="add-btn">
      <el-button type="danger" size="small" @click="goDetail()">新建运费模板</el-button>
    </div><br>
    <el-alert title="默认模板由系统根据现有商品的信息自动生成，可以修改，未被使用的模板可以删除" type="warning" show-icon />
    <br>
    <el-table
      :data="tableData"
      border
      class="header-table"
      style="width: 100%">
      <el-table-column
        prop="templateName"
        label="模板名称"
        min-width="200" />
      <el-table-column
        prop="countType"
        label="计费方式"
        width="200" />
      <el-table-column
        prop="updateTime"
        label="最后编辑时间"
        width="200" />
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button type="text" @click="copyHandler">复制</el-button>
          <el-button type="text" @click="goDetail(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteHandler(scope.row)">删除</el-button>
          <el-button type="text">使用情况</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as FeightAPI from '../../api/feight'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      FeightAPI.fetchList().then(response => {
        this.tableData = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    copyHandler(row) {
    },
    deleteHandler(row) {
      this.$confirm('确认删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        FeightAPI.deleteFeight({
          id: row.id
        }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除后刷新table
          this.getList()
        }).catch(error => {
          console.error(error)
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {})
    },
    goDetail(row) {
      if (!row) {
        // 新建
        this.$router.push({ path: `/feight/detail` })
      } else {
        // 编辑
        this.$router.push({ path: `/feight/detail/${row.id}` })
      }
    }
  }
}
</script>
