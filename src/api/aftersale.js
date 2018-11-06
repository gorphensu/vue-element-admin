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

export function fetchReturnAddressList(params) {
  return request({
    url: 'aftersale/returnaddress',
    method: 'post',
    params
  })
}

export function deleteReturnAddress(params) {
  return request({
    url: 'aftersale/deletereturnaddress',
    method: 'post',
    params
  })
}

export function addReturnAddress(params) {
  return request({
    url: 'aftersale/addreturnaddress',
    methods: 'post',
    params
  })
}
