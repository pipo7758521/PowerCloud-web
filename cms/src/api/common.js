import request from '@/utils/request'

// 管理域 关联表中的 变电所ID
export function stationIDList() {
  return request({
    url: '/common/stationIDList.json',
    method: 'get',
  })
}

//网关中的 电表ID
export function deviceElecMeterList() {
  return request({
    url: '/common/stationIDList.json',
    method: 'get',
  })
}


//变压器母联表中的 变压器ID
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
/*export function electricianIDList(){
  return request({
    url: '/common/electricianIDList.json',
    method: 'get',
  })

}
*/
//电表 and 网关指令表 中的 设备类型
export function deviceTypeList() {
  return request({
    url: '/typeDevice/list.json',
    method: 'get',
  })
}

