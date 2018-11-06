import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import orderAPI from './order'
import productAPI from './product'
import AfterSaleAPI from './aftersale'
import Feight from './feight'
import BaseData from './basedata'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// Order
Mock.mock(/\/order\/list/, 'post', orderAPI.getList)
Mock.mock(/\/order\/detail/, 'post', orderAPI.getDetail)

// Product
Mock.mock(/\/product\/list/, 'post', productAPI.getList)
Mock.mock(/\/product\/detail/, 'post', productAPI.getDetail)

// AfterSale
Mock.mock(/\/aftersale\/list/, 'post', AfterSaleAPI.getList)
Mock.mock(/\/aftersale\/detail/, 'post', AfterSaleAPI.getDetail)
Mock.mock(/\/aftersale\/returnaddress/, 'post', AfterSaleAPI.getReturnList)
Mock.mock(/\/aftersale\/deletereturnaddress/, 'post', AfterSaleAPI.deleteReturnAddress)
Mock.mock(/\/aftersale\/addreturnaddress/, 'post', AfterSaleAPI.addReturnAddress)

// Feight
Mock.mock(/\/feight\/list/, 'post', Feight.getList)
Mock.mock(/\/feight\/detail/, 'post', Feight.getDetail)
Mock.mock(/\/feight\/deletefeight/, 'post', Feight.deletefeight)

// BaseData
Mock.mock(/\/basedata\/getprovinces/, 'post', BaseData.getProvinces)
export default Mock
