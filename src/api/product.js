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
