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
