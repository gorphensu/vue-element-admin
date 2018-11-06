import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = [{
  code: '1',
  name: '广东省'
}]

const obj = {
  code: '@increment',
  name: '广东省'
}

const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    ...obj
  }))
}
export default {
  getProvinces: config => {
    return List
  }
}
