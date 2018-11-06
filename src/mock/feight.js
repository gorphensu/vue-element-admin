import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    templateName: '默认运费模板',
    countType: '按件计费',
    updateTime: '2018-10-27 12:24:55'
  }))
}

export default {
  getList: config => {
    // const params = param2Obj(config.url)
    return List
  },
  getDetail: config => {
    // const params = param2Obj(config.url)
    return {
    }
  },
  deleteFeight: config => {
    return {}
  }
}
