<template>
  <div class="select-category order-container">
    <el-breadcrumb separator="/" class="nav-breadcrumb">
      <!-- <el-breadcrumb-item :to="{ path: '/product/index'}">产品列表</el-breadcrumb-item> -->
      <el-breadcrumb-item>发布新商品</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="category-container">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="">
          <el-input v-model="searchForm.key" placeholder="请输入关键字搜索分类"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">快速查询</el-button>
        </el-form-item>
      </el-form>
      <div class="cate-container">
        <div class="cc-listwrap">
          <div class="cc-list-item">
            <div class="search-con">
              <el-input
                v-model="searchForm.searchKey1"
                placeholder="一级分类:名称检索"
                size="mini"
                suffix-icon="el-icon-search"/>
            </div>
            <div class="group-list">
              <el-collapse accordion>
                <el-collapse-item v-for="firstGroupItem in categoryDatas" :key="firstGroupItem.id">
                  <template slot="title">
                    {{ firstGroupItem.name }}
                  </template>
                  <ul v-if="firstGroupItem.data && firstGroupItem.data.length" class="list">
                    <li
                      v-for="item in firstGroupItem.data"
                      :key="item.id"
                      :class="{'is-active': item.id === (selectData.length && selectData[0].id)}"
                      @click="firstItemClick(item)">
                      {{ item.name }}
                      <i v-if="item.data && item.data.length" class="el-icon-arrow-right"/>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div v-if="secondData.length" class="cc-list-item">
            <div class="search-con">
              <el-input
                v-model="searchForm.searchKey2"
                placeholder="二级分类:名称检索"
                size="mini"
                suffix-icon="el-icon-search"/>
            </div>
            <div class="group-list">
              <ul class="list has-label">
                <li
                  v-for="(item, index) in secondData"
                  :key="item.id"
                  :class="{'is-active': item.id === (selectData.length && selectData[1] && selectData[1].id)}"
                  @click="secondItemClick(item)">
                  <span v-if="item.group && (index === 0 || (secondData[index - 1] && secondData[index - 1].group !== item.group))" class="label">{{ item.group | uppercase }}</span>{{ item.name }}
                  <i v-if="item.data && item.data.length" class="el-icon-arrow-right"/>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="thirdData.length" class="cc-list-item">
            <div class="search-con">
              <el-input
                v-model="searchForm.searchKey3"
                placeholder="三级分类:名称检索"
                size="mini"
                suffix-icon="el-icon-search"/>
            </div>
            <div class="group-list">
              <ul class="list has-label">
                <li
                  v-for="(item, index) in thirdData"
                  :key="item.id"
                  :class="{'is-active': item.id === (selectData.length && selectData[2] && selectData[2].id)}"
                  @click="thirdItemClick(item)">
                  <span v-if="item.group && (index === 0 || (thirdData[index - 1] && thirdData[index - 1].group !== item.group))" class="label">{{ item.group | uppercase }}</span>{{ item.name }}
                  <i v-if="item.data && item.data.length" class="el-icon-arrow-right"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cate-path">
      <dl>
        <div class="clearfix">
          <dt>已选:</dt>
          <dd>
            <ol class="category-path">
              <li
                v-for="selectItem in selectData"
                :key="selectItem.id">
                {{ selectItem.name }}&nbsp;<span class="divider">></span>&nbsp;
              </li>
              <li v-if="!selectData.length">无</li>
              <li v-if="!hasEnd && selectData.length">...</li>
            </ol>
          </dd>
        </div>
      </dl>
      <!-- <span class="arrow up"/> -->
    </div>
    <br>
    <div class="btn-container">
      <el-button :disabled="!hasEnd" type="primary" size="small" @click="confirmHandler">确定</el-button>
    </div>
  </div>
</template>

<script>
import * as BaseDataApi from '../../api/basedata'
export default {
  filters: {
    uppercase(val) {
      return val && val.toUpperCase() || val || ''
    }
  },
  data() {
    return {
      searchForm: {
        key: '',
        searchKey1: '',
        searchKey2: '',
        searchKey3: ''
      },
      categoryDatas: [],
      selectData: [],
      hasEnd: false // 标记是否选择完最后的数据,编辑进来的是true
    }
  },
  computed: {
    secondData() {
      if (!this.selectData.length) {
        return []
      }
      if (this.selectData[0].id) {
        for (const groupData of this.categoryDatas) {
          const datas = groupData && groupData.data || []
          for (const firstData of datas) {
            if (firstData.data && firstData.data.length && this.selectData[0].id === firstData.id) {
              return firstData.data
            }
          }
        }
      }
      return []
    },
    thirdData() {
      if (this.selectData.length < 2) {
        return []
      }
      if (this.selectData[1].id) {
        for (const secondData of this.secondData) {
          if (secondData.data && secondData.data.length && this.selectData[1].id === secondData.id) {
            return secondData.data
          }
        }
      }
      return []
    }
  },
  created() {
    this.searchParams = {}
    this.getData()
    if (this.$route.query && this.$route.query.productid) {
      // 从产品编辑页面过来
      this.productid = this.$route.query.productid
    }
  },
  methods: {
    onSearch() {
      this.searchParams = {
        key: this.searchForm.key
      }
    },
    getData() {
      BaseDataApi.fetchCategoryDatas({
        ...this.searchParams
      }).then(response => {
        this.categoryDatas = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    firstItemClick(item) {
      this.selectData = []
      this.$set(this.selectData, 0, {
        name: item.name,
        id: item.id
      })
      if (item.data && item.data.length) {
        this.hasEnd = false
      } else {
        this.hasEnd = true
      }
    },
    secondItemClick(item) {
      this.selectData.splice(2, 1)
      this.$set(this.selectData, 1, {
        name: item.name,
        id: item.id
      })
      if (item.data && item.data.length) {
        this.hasEnd = false
      } else {
        this.hasEnd = true
      }
    },
    thirdItemClick(item) {
      this.$set(this.selectData, 2, {
        name: item.name,
        id: item.id
      })
      // 选择第三层后,肯定是true
      this.hasEnd = true
    },
    confirmHandler() {
      const lastDataId = this.selectData[this.selectData.length - 1].id
      const lastDataText = this.selectData.map(data => {
        return data.name
      }).join(' > ')
      const productid = this.productid || ''
      this.$router.push({
        path: `/product/detail?categoryid=${lastDataId}&categoryname=${lastDataText}&productid=${productid}`
      })
    }
  }
}
</script>
