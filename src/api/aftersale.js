import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/aftersale/list',
    method: 'post',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'aftersale/detail',
    method: 'post',
    params
  })
}
