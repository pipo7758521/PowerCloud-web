import request from '@/utils/request'


export function fetchList(magDomainid) {
  return request({
    url: '/magDomain/magDomain_electricitySubstation.json?id='+magDomainid,
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