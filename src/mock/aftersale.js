import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

const ReturnList = []
const returnCount = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    orderId: '1472320183954823' + '@increment',
    afterSaleId: '1472320183954823' + '@increment',
    product: '端蛮双面穿短外套女装春哥求韩版休闲百搭大码胖妹小外衣【红色 500g】 X 3' + '@increment',
    orderAmount: '总金额：￥ 999.00;运费：￥ 0.00;总优惠：￥ 12.00;实付：￥ 987.00',
    afterSaleStatus: parseInt((Math.random() * 100)) % 3 + 1,
    afterSaleType: '仅退款',
    buyer: 'WX小明儿名字很长很长很长很长咯12312312',
    createTime: '2018.09.09 12:12:05'
  }))
}

for (let i = 0; i < returnCount; i++) {
  ReturnList.push(Mock.mock({
    id: '@increment',
    returnAddressName: '官方退货点' + '@increment',
    receiver: '林大哥',
    receiveMobile: '15622333212',
    area: '广东省广州市天河区',
    address: '天河路金水大道15号金星大厦1202'
  }))
}

export default {
  getList: config => {
    const params = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (!params.afterSaleStatus) {
        return true
      }
      return Number(params.afterSaleStatus) === Number(item.orderStatus)
    })
    const totalCount = mockList.length
    mockList = mockList.slice((Number(params.pageIndex) - 1) * params.pageSize, params.pageIndex * params.pageSize)
    return {
      data: mockList,
      totalCount: totalCount,
      pageSize: 25
    }
  },
  getDetail: config => {
    // const params = param2Obj(config.url)
    return {
    }
  },
  getReturnList: config => {
    return ReturnList
  },
  deleteReturnAddress: config => {
    return {
    }
  },
  addReturnAddress: config => {
    return {
    }
  }
}
