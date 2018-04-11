## 1. 基础配置
### 1. 设备类型
* GET : /api/cms/typeDevice/list
```
{
  "err": 0,
  "data": {
    "total": 2,
    "items": [{
      "typeDeviceID": 1,
      "typeDeviceName": "设备1",
      "functionName": "aaa",
      "className": "bbb",
      "description": "aaaaa"
    }, {
      "typeDeviceID": 2,
      "typeDeviceName": "设备2",
      "functionName": "aaa",
      "className": "bbb",
      "description": "aaaaa"
    }]
  }
}
```
* POST: /api/cms/typeDevice/add
```
传参：
{
      "typeDeviceID": "",
      "typeDeviceName": "设备2",
      "functionName": "aaa",
      "className": "bbb",
      "description": "aaaaa"   //非必填
}
返回：
{
  "err": 0
}
{
  "err": -1,
  "info": "错误信息"
}
```
* POST: /api/cms/typeDevice/update
```
传参：
{
      "typeDeviceID": 1,
      "typeDeviceName": "设备2",
      "functionName": "aaa",
      "className": "bbb",
      "description": "aaaaa"   //非必填
}
返回：
{
  "err": 0
}
{
  "err": -1,
  "info": "错误信息"
}
```
* POST: /api/cms/typeDevice/del
```
传参：
{
      "typeDeviceID": 1
}
返回：
{
  "err": 0
}
{
  "err": -1,
  "info": "错误信息"
}
```
* /api/cms/typeDevice/search
### 2. 管理域

***

## 2. 网关