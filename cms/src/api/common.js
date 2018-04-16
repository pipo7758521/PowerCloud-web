import request from '@/utils/request'

// 变电所ID
export function stationIDList() {
  return request({
    url: '/common/stationIDList.json',
    method: 'get',
  })
}

export function deviceElecMeterList() {
  return request({
    url: '/common/stationIDList.json',
    method: 'get',
  })
}


export function deviceTransformerList() {
  return request({
    url: '/common/deviceTransformerList.json',
    method: 'get',
  })
}


//管理域ID
export function magDomainIDList(){
  return request({
    url: '/common/magDomainIDList.json',
    method: 'get',
  })
}


//电工ID
export function electricianIDList(){
  return request({
    url: '/common/electricianIDList.json',
    method: 'get',
  })

}