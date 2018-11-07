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
        <div class="content">
          <div class="label-content">商品规格</div>
          <div class="inner-content">
            <div class="remark">最多添加两个商品规格，第一个商品规格可添加规格图片</div>
            <br>
            {{ form2 }}
            <div v-for="(specItem, index) in form2.specs" :key="index" class="panel-container">
              <div class="panel-header">
                <el-select v-model="specItem.specType" size="mini">
                  <el-option
                    v-for="item in specOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id" />
                </el-select>
                &nbsp;
                <img v-if="specItem.image" :src="specItem.image" class="spec-photo">
                <el-upload
                  :show-file-list="false"
                  :on-success="specUploadSuccessHandler"
                  :before-upload="beforeSpecUploadHandler(specItem)"
                  class="spec-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button v-show="!specItem.image" type="text">添加图片</el-button>
                </el-upload>
                <!-- <el-button v-show="!specItem.image" type="text">添加图片</el-button> -->
                <el-button v-show="specItem.image" type="text">删除图片</el-button>
                <el-button type="text" class="float-right" @click="deleteSpecTypeHandler(index)">删除规格</el-button>
              </div>
              <div class="panel-body">
                <el-form ref="specForm" :model="specItem" :inline="true" size="mini">
                  <el-form-item
                    v-for="(spec, $index) in specItem.data"
                    :key="$index"
                    :rules="{ required: true, message: ' ', trigger: 'blur' }"
                    :prop="'data.' + $index">
                    <el-input v-model="specItem.data[$index]" />
                    <i class="el-icon-error" @click="deleteSpecHandler(specItem.data, $index)"/>
                  </el-form-item>
                  <el-button type="text" @click="addSpecHandler(specItem, index, specItem.data)">添加</el-button>
                </el-form>
              </div>
              <br>
            </div>
            <div>
              <el-button type="default" @click="addSpecTypeHandler"><i class="el-icon-plus"/>添加规格</el-button>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="label-content">价格及库存</div>
          <div class="inner-content">
            <div class="panel-container">
              12
            </div>
          </div>
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
      specOptions: [{
        id: '1',
        name: '尺寸'
      }, {
        id: '2',
        name: '重量'
      }, {
        id: '3',
        name: '颜色'
      }],
      form2: {
        specs: [{
          specType: '1',
          image2: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1240685591,3219211103&fm=58',
          data: ['55寸']
        }]
      },
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
  beforeDestroy() {
    this._specItem = null
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
    },
    addSpecHandler(specItem, index, datas) {
      const formVm = this.$refs['specForm'] && this.$refs['specForm'][index]
      if (formVm) {
        formVm.validate(result => {
          if (!result) return
          datas.push('')
        })
      }
    },
    specUploadSuccessHandler(response, file, fileList) {
      if (this._specItem) {
        debugger
        // TODO 需要返回url路径
        this._specItem.image = file
      }
    },
    beforeSpecUploadHandler(specItem) {
      this._specItem = specItem
    },
    addSpecTypeHandler() {
      if (this.form2.specs.length >= 2) {
        this.$message({
          type: 'warning',
          message: '只允许新增两种商品尺寸'
        })
        return
      }
      this.form2.specs.push({
        specType: '',
        image: '',
        data: []
      })
    },
    deleteSpecTypeHandler(index) {
      this.form2.specs.splice(index, 1)
    },
    deleteSpecHandler(specDatas, index) {
      specDatas.splice(index, 1)
    }
  }
}
</script>
