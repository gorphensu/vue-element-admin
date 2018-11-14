import request from '@/utils/request'

export function fetchProvinceDatas(params) {
  return request({
    url: '/basedata/getprovinces',
    method: 'post',
    params
  })
}

export function fetchCategoryDatas(params) {
  return request({
    url: '/basedata/getcategorydatas',
    method: 'post',
    params
  })
}
