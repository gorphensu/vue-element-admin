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
        <div class="content">
          <el-form ref="baseForm" :model="baseForm" size="" class="base-form" label-width="120px">
            <!-- <CategoryItem v-model="baseForm.category" :required="true" label="商品分类" prop="category"/> -->
            <el-form-item label="商品分类" prop="categoryId">
              <span>{{ baseForm.categoryName }}</span>
              <el-button type="text" @click="changeCategory">修改分类</el-button>
            </el-form-item>
            <el-form-item :rules="baseFormRule.title" label="商品标题" prop="title" class="width600">
              <el-input v-model="baseForm.title" placeholder="商品标题组成：商品描述+规格"/>
            </el-form-item>
            <UploadListItem v-model="baseForm.carouselImages" :required="true" :max-length="2" label="商品轮播图" prop="carouselImages"/>
            <el-form-item label="描述" prop="desc" class="width600">
              <el-input v-model="baseForm.desc" :autosize="{ minRows: 4, maxRows: 10 }" type="textarea" placeholder="建议300字左右"/>
            </el-form-item>
            <UploadListItem v-model="baseForm.detailImages" :required="true" :max-length="2" label="商品详情图" prop="detailImages"/>
          </el-form>
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
            <!-- {{ form2 }} -->
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
                <!-- <el-upload
                  :show-file-list="false"
                  :on-success="specUploadSuccessHandler"
                  :before-upload="beforeSpecUploadHandler(specItem)"
                  class="spec-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button v-show="!specItem.image" type="text">添加图片</el-button>
                </el-upload> -->
                <!-- <el-button v-show="!specItem.image" type="text">添加图片</el-button> -->
                <el-checkbox v-model="specItem.image">添加图片</el-checkbox>
                <el-button type="text" class="float-right" @click="deleteSpecTypeHandler(index)">删除规格</el-button>
              </div>
              <div class="panel-body">
                <el-form :ref="'specForm' + '-' + index" :model="specItem" :inline="true" size="mini" class="spec-form">
                  <el-form-item
                    v-for="(spec, $index) in specItem.data"
                    :key="$index"
                    :rules="{ required: true, message: ' ', trigger: 'blur' }"
                    :prop="'data.' + $index + '.text'">
                    <el-input v-model="specItem.data[$index].text" />
                    <i class="el-icon-error" @click="deleteSpecHandler(specItem.data, $index)"/>
                    <el-upload
                      v-if="specItem.image"
                      :show-file-list="false"
                      :on-success="specUploadSuccessHandler"
                      :before-upload="beforeSpecUploadHandler(specItem.data, $index)"
                      class="spec-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/">
                      <img v-if="specItem.data[$index].image" :src="specItem.data[$index].image" class="spec-photo">
                      <i v-else class="el-icon-plus icon-plus"/>
                    </el-upload>
                  </el-form-item>
                  <el-button type="text" @click="addSpecHandler(specItem, index, specItem.data)">添加</el-button>
                </el-form>
                <br>
              </div>
              <br>
            </div>
            <div>
              <el-button type="default" @click="addSpecTypeHandler"><i class="el-icon-plus"/>添加规格</el-button>
            </div>
            <br>
          </div>
        </div>
        <div class="content">
          <div class="label-content">价格及库存</div>
          <div class="inner-content">
            <div class="panel-container">
              <div class="panel-body">
                <div class="batch-setting">
                  <el-form ref="specBatchForm" :model="batchForm" :inline="true" size="mini">
                    <el-form-item label="批量设置:"/>
                    <el-form-item label="库存">
                      <el-input v-model="batchForm.stock" placeholder=""/>
                    </el-form-item>
                    <el-form-item label="单买价">
                      <el-input v-model="batchForm.singlePrice" placeholder=""/>
                    </el-form-item>
                    <el-form-item label="拼团价">
                      <el-input v-model="batchForm.teamPrice" placeholder=""/>
                    </el-form-item>
                    <el-form-item label="拼团人数">
                      <el-input v-model="batchForm.teamCount" placeholder=""/>
                    </el-form-item>
                    <el-button type="default" size="mini" @click="batchConfirmHandler">确定</el-button>
                  </el-form>
                </div>
                <br>
                <!-- 规格表格 -->
                <!-- {{ specTableData }} -->
                <el-form :model="{}">
                  <el-table :data="specTableData" border stripe style="width: 100%" class="spec-table header-table">
                    <el-table-column
                      v-for="(column) in stockTableColumns"
                      :key="column.column"
                      :label="column.columnName"
                      :prop="column.column" />
                    <el-table-column
                      label="*库存"
                      prop="stock"
                      width="150">
                      <template slot-scope="scope">
                        <TableInput v-model="scope.row.stock" :required="true" prop="stock"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="*单买价"
                      prop="singlePrice"
                      width="150">
                      <template slot-scope="scope">
                        <TableInput v-model="scope.row.singlePrice" :required="true" prop="singlePrice"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="*团购价"
                      prop="teamPrice"
                      width="150">
                      <template slot-scope="scope">
                        <TableInput v-model="scope.row.teamPrice" :required="true" prop="teamPrice"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="sku编码"
                      prop="sku"
                      width="150">
                      <template slot-scope="scope">
                        <TableInput v-model="scope.row.sku" :required="false" prop="sku"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="*预览图"
                      prop="image"
                      width="150">
                      <template slot-scope="scope">
                        <TableUpload v-model="scope.row.image" :required="true" prop="image"/>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form>
              </div>
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
        <el-button type="primary" @click="saveHandler">提交并上架</el-button>
        <el-button type="default" @click="cancelHandler">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as FeightAPI from '../../api/feight'
import TableInput from './components/tableinputitem'
import TableUpload from './components/tableuploaditem'
import UploadListItem from './components/uploadlistitem'
import CategoryItem from './components/categoryitem'
export default {
  components: {
    TableInput,
    TableUpload,
    UploadListItem,
    CategoryItem
  },
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
      baseForm: {
        productId: '',
        categoryId: '',
        categoryName: '',
        title: '',
        desc: '',
        carouselImages: [],
        detailImages: []
      },
      baseFormRule: {
        title: [{
          required: true,
          trigger: 'blur',
          validator(rule, value, callback) {
            if (!value) {
              return callback(' ')
            }
            if (value.length > 60) {
              return callback('可输入字符长度:' + 60)
            }
            callback()
          }
        }]
      },
      form2: {
        specs: [{
          specType: '1',
          image: true,
          data: [{
            image: '', // https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80
            text: '55尺寸'
          }]
        }]
      },
      batchForm: {
        stock: '', // 库存
        singlePrice: '',
        teamPrice: '',
        teamCount: ''
      },
      specTableData: [],
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
  computed: {
    stockTableColumns() {
      const res = []
      this.form2.specs.forEach((spec, index) => {
        const specTypeObj = this.specOptions.find(option => {
          return option.id === spec.specType
        })
        if (specTypeObj) {
          res.push({
            column: 'spec-' + index,
            columnName: specTypeObj.name
          })
        }
      })
      // this.initStockTableDatas()
      return res
    }
    // 表格的行数,2x2
    // stockTableDatas() {
    //   const datas = []
    //   if (!this.stockTableColumns.length) {
    //     return []
    //   } else if (this.stockTableColumns.length === 1) {
    //     this.form2.specs.forEach((spec, specIndex) => {
    //       spec.data.forEach(data => { // data => image, text
    //         datas.push({
    //           'spec-0': data.text,
    //           'spec-1': '',
    //           stock: '',
    //           singlePrice: '',
    //           teamPrice: '',
    //           sku: '',
    //           image: ''
    //         })
    //       })
    //     })
    //   } else if (this.stockTableColumns.length === 2) {
    //     this.form2.specs.forEach((spec, specIndex) => {
    //       spec.data.forEach(data => {
    //         datas.push({
    //           'spec-0': this.stockTableColumns[specIndex].columnName,
    //           'spec-1': data.text,
    //           stock: '',
    //           singlePrice: '',
    //           teamPrice: '',
    //           sku: '',
    //           image: ''
    //         })
    //       })
    //     })
    //   }
    //   return datas
    // }
  },
  watch: {
    'form2.specs': {
      deep: true,
      handler: function(val, oldVal) {
        this.initStockTableDatas()
      }
    }
  },
  created() {
    this.getFeightList()
    this.initStockTableDatas()
    if (this.$route.query && this.$route.query.categoryid) {
      // 从选择
      this.baseForm.categoryId = this.$route.query.categoryid
      this.baseForm.categoryName = this.$route.query.categoryname
      this.baseForm.productId = this.$route.query.productid
    }
  },
  beforeDestroy() {
    this._specItem = null
  },
  methods: {
    initStockTableDatas() {
      const datas = []
      if (!this.stockTableColumns.length) {
        return []
      } else if (this.stockTableColumns.length === 1) {
        this.form2.specs.forEach((spec, specIndex) => {
          spec.data.forEach(data => { // data => image, text
            datas.push({
              'spec-0': data.text,
              'spec-1': '',
              stock: '',
              singlePrice: '',
              teamPrice: '',
              sku: '',
              image: ''
            })
          })
        })
      } else if (this.stockTableColumns.length === 2) {
        this.form2.specs.forEach((spec, specIndex) => {
          spec.data.forEach(data => {
            datas.push({
              'spec-0': this.stockTableColumns[specIndex].columnName,
              'spec-1': data.text,
              stock: '',
              singlePrice: '',
              teamPrice: '',
              sku: '',
              image: ''
            })
          })
        })
      }
      this.specTableData = []
      this.$nextTick(() => {
        this.specTableData = datas
      })
    },
    saveHandler() {
      this.$refs['baseForm'].validate(res => {
        debugger
      })
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
      if (!specItem.specType) {
        this.$message({
          type: 'warning',
          message: '请选择规格类型'
        })
        return
      }
      const formVm = this.$refs['specForm-' + index][0]
      if (formVm) {
        formVm.validate(result => {
          if (!result) return
          datas.push({
            text: '',
            image: ''
          })
        })
      } else {
        datas.push({
          text: '',
          image: ''
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
        image: false,
        data: []
      })
    },
    deleteSpecTypeHandler(index) {
      this.form2.specs.splice(index, 1)
    },
    deleteSpecHandler(specDatas, index) {
      specDatas.splice(index, 1)
    },
    batchConfirmHandler() {
    },
    changeCategory() {
      const productId = this.baseForm.productId || ''
      this.$router.push({
        path: `/product/category?productid=${productId}`
      })
    }
  }
}
</script>
