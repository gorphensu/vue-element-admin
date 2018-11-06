import request from '@/utils/request'

export function fetchProvinceDatas(params) {
  return request({
    url: '/basedata/getprovinces',
    method: 'post',
    params
  })
}
