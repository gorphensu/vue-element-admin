<template>
  <div class="product-detail order-container order-detail">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/product/index'}">产品列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑产品</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="border-block">
      <div class="block-item">
        <div class="title">
          <span class="no">1</span>
          商品基本信息
        </div>
      </div>

      <div class="block-item">
        <div class="title">
          <span class="no">2</span>
          商品规格与库存
        </div>
      </div>

      <div class="block-item last-child">
        <div class="title">
          <span class="no">3</span>
          服务与承诺
        </div>
        <div class="content">
          <el-form ref="form3" :model="form3" :rules="rule3" label-width="110px">
            <el-form-item label="商品类型" prop="productType">
              <el-radio-group v-model="form3.productType">
                <el-radio label="0">普通商品</el-radio>
                <el-radio label="1">进口商品</el-radio>
                <el-radio label="2">直供商品</el-radio>
                <el-radio label="3">直邮商品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否二手" prop="isSecond">
              <el-radio-group v-model="form3.isSecond">
                <el-radio label="0">非二手</el-radio>
                <el-radio label="1">二手</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发货时间承诺" prop="deliveryTime">
              <el-radio-group v-model="form3.deliveryTime">
                <el-radio label="0">48小时</el-radio>
                <el-radio label="1">24小时</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="运费模板" prop="feightTemplate">
              <el-select v-model="form3.feightTemplate" placeholder="">
                <el-option v-for="item in feightTemplateOptions" :key="item.id" :label="item.templateName" :value="item.id"/>
              </el-select>
              <el-button type="text" @click="addFeightTemplate">新建运费模板</el-button>
            </el-form-item>
            <el-form-item label="承诺" prop="promise">
              <el-checkbox-group v-model="form3.promise">
                <el-checkbox label="0">假一赔十</el-checkbox>
                <el-checkbox label="1">七天包退</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="btn-container">
        <el-button type="danger" @click="saveHandler">提交并上架</el-button>
        <el-button type="default" @click="cancelHandler">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as FeightAPI from '../../api/feight'

export default {
  data() {
    return {
      form3: {
        productType: '',
        isSecond: '0',
        deliveryTime: '0',
        feightTemplate: '',
        promise: []
      },
      feightTemplateOptions: [],
      rule3: {
        productType: {
          required: true,
          message: '请选择商品类型',
          trigger: 'blur'
        },
        isSecond: {
          required: true,
          message: '请选择是否二手',
          trigger: 'change'
        },
        deliveryTime: {
          required: true,
          message: '请选择发货时间承诺',
          trigger: 'change'
        },
        feightTemplate: {
          required: true,
          message: '请选择运费模板',
          trigger: 'change'
        }
      }
    }
  },
  created() {
    this.getFeightList()
  },
  methods: {
    saveHandler() {
    },
    cancelHandler() {
      this.$router.go(-1)
    },
    addFeightTemplate() {
      this.$router.push({ path: `/feight/detail` })
    },
    getFeightList() {
      FeightAPI.fetchList().then(response => {
        this.feightTemplateOptions = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
