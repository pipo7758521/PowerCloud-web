import request from '@/utils/request'

// 变电所ID
export function treeList() {
  return request({
    url: '/enterprise/tree.json',
    method: 'get',
  })
}
