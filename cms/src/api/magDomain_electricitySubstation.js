import request from '@/utils/request'


export function fetchList(magDomainID) {
  return request({
    url: '/magDomain/magDomain_electricitySubstation.json?id='+magDomainID,
    method: 'get',
  })
}

export function insertData(data) {
  return request({
    // url: '/article/create',
    url: '/success.json',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return request({
    // url: '/article/update',
    url: '/success.json',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    // url: '/article/update',
    url: '/success.json',
    method: 'post',
    data
  })
}
