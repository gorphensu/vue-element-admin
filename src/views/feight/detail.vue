<template>
  <div class="order-container feight-detail aftersale-setting-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/feight/index'}">运费模板</el-breadcrumb-item>
      <el-breadcrumb-item>{{ isEditStatus ? '编辑运费模板' : '新增运费模板' }}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-alert title="默认模板由系统根据现有商品的信息自动生成，可以修改，未被使用的模板可以删除" type="warning" show-icon />
    <div class="block-container">
      <el-form ref="form" :model="templateForm" :rules="rules" class="template-form" label-width="120px" size="small">
        <el-form-item label="模板名称：" prop="templateName">
          <el-input v-model="templateForm.templateName"/>
        </el-form-item>
        <el-form-item label="发货地：" prop="area">
          <el-cascader :options="[]" v-model="templateForm.area" change-on-select @change="areaChangeHandler"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">包邮地区 &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text">全选</el-button>
      <el-button type="text">取消选择</el-button>
      <el-button type="text">反选</el-button>
    </div>
    <div class="block-container">
      <el-checkbox-group v-model="freeShippingArea">
        <el-checkbox v-for="item in areaOptions" :key="item.code" :label="item.code" border>{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="title">付邮费地区（按件计算） &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text">全选</el-button>
      <el-button type="text">取消选择</el-button>
      <el-button type="text">反选</el-button>
    </div>
    <div class="block-container">
      <el-checkbox-group v-model="noFreeShippingArea">
        <el-checkbox v-for="item in areaOptions" :key="item.code" :label="item.code" border>{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import * as BaseDataAPI from '../../api/basedata'

export default {
  data() {
    return {
      isEditStatus: false,
      areaOptions: [],
      freeShippingArea: [],
      noFreeShippingArea: [],
      templateForm: {
        templateName: '',
        area: []
      },
      rules: {
        templateName: {
          required: true,
          message: '请输入模板名称',
          trigger: 'blur'
        },
        area: {
          required: true,
          message: '请选择发货地',
          trigger: 'change',
          validator: function(rule, value, callback, source, options) {
            callback()
          }
        }
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.isEditStatus = true
    }
    this.getProvinces()
  },
  methods: {
    areaChangeHandler(val) {
      this.templateForm.area = val
    },
    getProvinces() {
      BaseDataAPI.fetchProvinceDatas().then(response => {
        this.areaOptions = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
