import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/table/list',
    url: '/tablelist.json',
    method: 'get',
    params
  })
}
