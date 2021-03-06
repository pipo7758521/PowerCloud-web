import request from '@/utils/request'

//前端模块 和 后台接口名称 的映射关系
export let API_URL = {};

let isDebug = process.env.NODE_ENV == "development";

//moduleName规则： 主表用驼峰法命名，子表用_连接
if(true || isDebug) {
  API_URL = {
    /*
        //设备类型
        typeDevice: "/typeDevice/list.json",

        //管理域
        magDomain: "/magDomain/list.json",
        magDomain_electricitySubstation: "/magDomain/magDomain_electricitySubstation.json",
        //网关
        deviceGateway: "/deviceGateway/list.json",
        deviceGateway_instructions: "/deviceGateway/deviceGateway_instructions.json",
        //企业
        tree: "/enterprise/tree.json",
        customer: "/enterprise/customer.json",
        //变电所
        electricitySubstation: "/enterprise/electricitySubstation.json",
        electricitySubstation_video: "/enterprise/electricitySubstation_video.json",
        electricitySubstation_pic: "/enterprise/electricitySubstation_pic.json",
        //进线柜 变压器
        electricitySubstation_incoming: "/enterprise/electricitySubstation_incoming.json",
        deviceTransformer_connection: "/enterprise/deviceTransformer_connection.json",
        //电容柜
        electricitySubstation_capacitor: "/enterprise/electricitySubstation_capacitor.json",
        //馈电柜
        electricitySubstation_low: "/enterprise/electricitySubstation_low.json",
        electricitySubstation_low_pic: "/enterprise/electricitySubstation_low_pic.json",
        //电表
        deviceElecMeter: "/enterprise/deviceElecMeter.json",

        //电工
        electrician: "/electrician/list.json",
        electrician_pic: "/electrician/electrician_pic_list.json",
        magDomain_electrician: "/electrician/magDomain_electrician_list.json",
    */

    //设备类型
    typeDevice: "typeDevice",

    //管理域
    magDomain: "magDomain",
    magDomain_electricitySubstation: "magDomainElectricity",
    //网关
    deviceGateway: "gateWay",
    deviceGateway_instructions: "gatewayInstructions",
    //企业
    tree: "customer/tree",
    customer: "customer",

    //变电所
    electricitySubstation: "electricitySubstation",
    electricitySubstation_video: "electricitysubstationVideo",
    electricitySubstation_pic: "electricitySubstationPic",

    //变压器(用于查询变压器母联表)
    electricitySubstation_transformer: "transformer",
    //进线柜
    electricitySubstation_incoming: "incomingCabinet",
    deviceTransformer_connection: "transformerConnection",
    //电容柜
    electricitySubstation_capacitor: "capacitorCabinet",
    //馈电柜
    electricitySubstation_low: "lowCabinet",
    electricitySubstation_low_pic: "lowCabinetPic",
    //电表
    deviceElecMeter: "elecmeter",

    //电工
    electrician: "electrician",
    electrician_pic: "electricianPic",
    electrician_role: "sysElectricianRole",
    magDomain_electrician: "magDomainElectrician",

    //权限
    function: "sysFunction",
    role: "sysRole",
    role_function: "sysRoleFunction"

  }
}

export function fetchList(moduleName, data) {
  if(!data) {
    data = {page:1, limit:10000}
  }
  return request({
    // url: API_URL[moduleName],
    url: "/cms/"+API_URL[moduleName]+"/list",
    method: 'get',
    params: data
  })
}

export function insertData(moduleName, data) {
  return request({
    url: "/cms/"+API_URL[moduleName]+"/add",
    // url: isDebug ? '/success.json' : `/${moduleName}/insert`,
    method: 'post',
    data
  })
}

export function editData(moduleName, data) {
  return request({
    url: "/cms/"+API_URL[moduleName]+"/update",
    // url: isDebug ? '/success.json' : `/${moduleName}/update`,
    method: 'post',
    data
  })
}

export function deleteData(moduleName, data) {
  return request({
    url: "/cms/"+API_URL[moduleName]+"/del",
    // url: isDebug ? '/success.json' : `/${moduleName}/delete`,
    method: 'post',
    data
  })
}


export function fetchTreeList(data) {
  return request({
    url: "/cms/"+API_URL["tree"],
    method: 'post',
    params: data
  })
}
