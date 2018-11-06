import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/feight/list',
    method: 'post',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'feight/detail',
    method: 'post',
    params
  })
}

export function deleteFeight(params) {
  return request({
    url: 'feight/deletefeight',
    method: 'post',
    params
  })
}
