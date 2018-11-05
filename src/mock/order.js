import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    orderId: '1472320183954823' + '@increment',
    product: '端蛮双面穿短外套女装春哥求韩版休闲百搭大码胖妹小外衣【红色 500g】 X 3' + '@increment',
    orderAmount: '总金额：￥ 999.00;运费：￥ 0.00;总优惠：￥ 12.00;实付：￥ 987.00',
    freightType: '默认运费模板',
    orderStatus: parseInt((Math.random() * 100)) % 3 + 1,
    buyer: 'WX小明儿名字很长很长很长很长咯12312312',
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
    mockList = mockList.slice(params.pageIndex * params.pageSize, (Number(params.pageIndex) + 1) * params.pageSize)
    return {
      data: mockList,
      totalCount: totalCount,
      pageSize: 25
    }
  }
}
