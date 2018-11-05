import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/order/list',
    method: 'post',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'order/detail',
    method: 'post',
    params
  })
}
