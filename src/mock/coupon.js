import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []

const obj = {
  id: '@increment',
  couponName: '满1000件20',
  amount: '20元',
  threshold: '满1000可用',
  channel: '店铺非公开券',
  activeTime: '2018-10-07 ~ 2018-10-31',
  releaseCount: '55',
  receiveCount: '44',
  usedCount: '3',
  staus: '已结束'
}

const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    ...obj
  }))
}
export default {
  getList: config => {
    return List
  }
}
