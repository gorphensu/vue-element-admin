import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/product/list',
    method: 'post',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'product/detail',
    method: 'post',
    params
  })
}

export function fetchEvaluateList(params) {
  return request({
    url: '/evaluate/list',
    method: 'post',
    params
  })
}
