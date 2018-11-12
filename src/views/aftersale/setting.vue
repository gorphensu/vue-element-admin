<template>
  <div class="order-container aftersale-setting-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item>售后设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">售后联系号码</div>
    <div class="input-container">
      <el-input v-model="mobile" size="small" placeholder="请输入联系号码" />
      <el-button type="primary" size="small">保存</el-button>
    </div>
    <div class="title">退货地址
      <span class="add-btn"><el-button type="danger" size="small" @click="openDialogHandler()">新建退货地址</el-button></span>
    </div><br>
    <el-table
      :data="tableData"
      border
      class="header-table"
      style="width: 100%">
      <el-table-column
        prop="returnAddressName"
        label="退货地点名称"
        width="200" />
      <el-table-column
        prop="receiver"
        label="收件人"
        width="200" />
      <el-table-column
        prop="receiveMobile"
        label="收件人电话"
        width="200" />
      <el-table-column
        prop="area"
        label="地区"
        width="200" />
      <el-table-column
        prop="address"
        label="详细地址"
        width="300" />
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text"><i title="编辑" class="el-icon-edit-outline" @click="openDialogHandler(scope.row)"/></el-button>
          <el-button type="text"><i title="删除" class="el-icon-delete" @click="deleteHandler(scope.row)"/></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="closeHandler"
      title="退货地址"
      width="40%">
      <el-form ref="form" :model="addressForm" :rules="rules" label-width="120px" size="small">
        <el-form-item label="退货地点名称：" prop="returnAddressName">
          <el-input v-model="addressForm.returnAddressName"/>
        </el-form-item>
        <el-form-item label="区域：" prop="area">
          <el-cascader :options="[]" v-model="addressForm.area" change-on-select @change="areaChangeHandler"/>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input v-model="addressForm.address" />
        </el-form-item>
        <el-form-item label="收件人：" prop="receiver">
          <el-input v-model="addressForm.receiver" />
        </el-form-item>
        <el-form-item label="收件人电话：" prop="receiveMobile">
          <el-input v-model="addressForm.receiveMobile" />
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as AfterSaleAPI from '../../api/aftersale'

export default {
  data() {
    return {
      mobile: '',
      tableData: [],
      showDialog: false,
      addressForm: {
        returnAddressName: '',
        area: [],
        address: '',
        receiver: '',
        receiveMobile: ''
      },
      rules: {
        returnAddressName: {
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        area: {
          required: true,
          message: '请选择区域',
          trigger: 'change',
          validator: function(rule, value, callback, source, options) {
            callback()
          }
        },
        address: {
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        },
        receiver: {
          required: true,
          message: '请输入收件人',
          trigger: 'blur'
        },
        receiveMobile: {
          required: true,
          message: '收件人电话',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    this.getReturnAddressList()
  },
  methods: {
    areaChangeHandler(val) {
      this.addressForm.area = val
    },
    saveHandler() {
      AfterSaleAPI.addReturnAddress(this.addressForm).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.getReturnAddressList()
      }).catch(error => {
        console.error(error)
        this.$message({
          type: 'error',
          message: '保存失败!'
        })
      })
    },
    closeHandler() {
      // 重置form
      this.showDialog = false
      this.addressForm.addReturnAddress = ''
      this.addressForm.area = []
      this.addressForm.address = ''
      this.addressForm.receiver = ''
      this.addressForm.receiveMobile = ''
    },
    getReturnAddressList() {
      AfterSaleAPI.fetchReturnAddressList().then(response => {
        this.tableData = response.data || []
      }).catch(error => {
        console.error(error)
      })
    },
    deleteHandler(row) {
      this.$confirm('确认删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        AfterSaleAPI.deleteReturnAddress({
          id: row.id
        }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除后刷新table
          this.getReturnAddressList()
        }).catch(error => {
          console.error(error)
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {})
    },
    openDialogHandler(row) {
      if (row) {
        // 获取详情
      }
      this.showDialog = true
    }
  }
}
</script>
