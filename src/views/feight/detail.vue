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
      <el-checkbox-group v-model="noFreeShippingByCountArea">
        <el-checkbox v-for="item in areaOptions" :key="item.code" :label="item.code" border>{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div>
        <el-form :inline="true" :model="noFreeShippingByCountForm" size="mini">
          <el-form-item label="配送运费： 首件：">
            <el-input v-model="noFreeShippingByCountForm.firstCount" />
          </el-form-item>
          <el-form-item label="首费：">
            <el-input v-model="noFreeShippingByCountForm.firstAmount" />
          </el-form-item>
          <el-form-item label="续件：">
            <el-input v-model="noFreeShippingByCountForm.addCount" />
          </el-form-item>
          <el-form-item label="续费：">
            <el-input v-model="noFreeShippingByCountForm.addAmount" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="title">付邮费地区（按重量计算） &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text">全选</el-button>
      <el-button type="text">取消选择</el-button>
      <el-button type="text">反选</el-button>
    </div>
    <div class="block-container">
      <el-checkbox-group v-model="noFreeShippingByWeightArea">
        <el-checkbox v-for="item in areaOptions" :key="item.code" :label="item.code" border>{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div>
        <el-form :inline="true" :model="noFreeShippingByCountForm" size="mini">
          <el-form-item label="配送运费： 首重：">
            <el-input v-model="noFreeShippingByCountForm.firstWeight" />g
          </el-form-item>
          <el-form-item label="首费：">
            <el-input v-model="noFreeShippingByCountForm.firstAmount" />
          </el-form-item>
          <el-form-item label="续重：">
            <el-input v-model="noFreeShippingByCountForm.addWeight" />g
          </el-form-item>
          <el-form-item label="续费：">
            <el-input v-model="noFreeShippingByCountForm.addAmount" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="title">不配送 &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text">全选</el-button>
      <el-button type="text">取消选择</el-button>
      <el-button type="text">反选</el-button>
    </div>
    <div class="block-container">
      <el-checkbox-group v-model="noShippingArea">
        <el-checkbox v-for="item in areaOptions" :key="item.code" :label="item.code" border>{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="btn-container">
      <el-button type="danger" @click="saveHandler">确定</el-button>
      <el-button type="default" @click="cancelHandler">取消</el-button>
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
      noFreeShippingByCountArea: [],
      noFreeShippingByWeightArea: [],
      noShippingArea: [],
      templateForm: {
        templateName: '',
        area: []
      },
      noFreeShippingByCountForm: { // 付邮费地区（按件计算）
        firstCount: '', // 首件
        firstAmount: '', // 首费
        addCount: '', // 续件
        addAmount: '' // 续费
      },
      noFreeShippingByWeightForm: { // 付邮费地区（按重量计算）
        firstWeight: '', // 首重
        firstAmount: '', // 首费
        addWeight: '', // 续重
        addAmount: '' // 续费
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
    },
    cancelHandler() {
      // 取消
      this.$router.go(-1)
    },
    saveHandler() {
      // 保存
    }
  }
}
</script>
