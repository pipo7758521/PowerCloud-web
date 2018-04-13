import request from '@/utils/request'

if(process.env.NODE_ENV == "development") {
  console.log("====== development =======")
}

export function fetchList(data) {
  return request({
    url: '/typeDevice/list.json',
    method: 'get',
    params: data
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
