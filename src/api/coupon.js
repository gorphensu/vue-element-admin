import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/coupon/list',
    method: 'post',
    params
  })
}
