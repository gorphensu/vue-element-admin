import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/order/list',
    method: 'post',
    params
  })
}
