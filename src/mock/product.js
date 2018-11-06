import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    productId: '1472320183954823' + '@increment',
    productName: '端蛮双面穿短外套女装春哥求韩版休闲百搭大码胖妹小外衣' + '@increment',
    singlePrice: '￥12.00',
    teamPrice: '￥14.00',
    status: '上架',
    createTime: '2018.09.09 12:12:05'
  }))
}

export default {
  getList: config => {
    const params = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (!params.orderStatus) {
        return true
      }
      return Number(params.orderStatus) === Number(item.orderStatus)
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
  }
}
