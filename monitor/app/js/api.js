var HOST = "";
const MQTT_HOST = "202.118.26.129";
const MQTT_PORT = 8083;
var UrlPath = {};

var debug = process.env.NODE_ENV === 'development';

if(debug){
  UrlPath = {
    mapPoint1: "api/mapPoint1.json",
    mapPoint2: "api/mapPoint2.json",
    mapPoint3: "api/mapPoint3.json",
    staffDetail: "api/staffDetail.json",
    companyDetail: "api/companyDetail.json",
    stationDetail: "api/stationDetail.json",
  }
}
else {
  HOST = "http://202.118.26.7:8080/PowerCloud/api";
  UrlPath = {
    mapPoint: "/electricitysubstation/getMapPoint",
    staffDetail: "/electrician/profile",
    companyDetail: "/customer/getCompanyDetail",
    stationDetail: "/electricitysubstation/getStationDetail",
  }
}

// 封装一个get请求的方法
function request(url, type, data) {
  return new Promise(function(resolve, reject) {
    var XHR = new XMLHttpRequest();


    XHR.open(type, HOST + url, true);
    XHR.setRequestHeader("Content-type","application/json; charset=utf-8");
    XHR.send(data);

    XHR.onreadystatechange = function() {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          try {
              var response = JSON.parse(XHR.responseText);
              console.log(response)
              if(response.succeeded) {
                var r = typeof(response.data) == "string" ? JSON.parse(response.data) : response.data;
                resolve(r);
              }
              else {
                alert("请求数据错误");
                reject();
              }
          } catch (e) {
              reject(e);
          }
        } else {
          reject(new Error(XHR.statusText));
        }
      }
    }
  })
}

function initMqttConnection(callback, onMessageArrived) {
  var client = new Paho.MQTT.Client(MQTT_HOST, Number(MQTT_PORT), "webClient_"+Date.now());//建立客户端实例
  client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
  function onConnect() {
      console.log("onConnected");
      // isMqttConnected = true;
      callback(client);
  }
  client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
  client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
  function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
          console.log("连接已断开");
          alert("Error：mqtt连接已断开");
       }
  }
}

function mqttSubscribe(client,topic) {
  if(client) {
    console.log(topic)
    client.subscribe(topic);//订阅主题
  }
}

function mqttDisconnect(client) {
  if(client) {
    console.log("disconnect")
    client.disconnect();//订阅主题
  }
}


function getMapPoint(type, callback) {

  return new Promise(function(resolve,reject){
    var path;
    if(debug){
      path = UrlPath["mapPoint"+type];
    }
    else{
      path = UrlPath.mapPoint;
    }
    request(path+"?type="+type, "POST", null).then(function(r) {
      resolve(r)
    })
  })
}


function getStaffDetail(id) {
  return new Promise(function(resolve,reject){
    request(UrlPath.staffDetail+"?id="+id, "POST", null).then(function(r) {
      resolve(r)
    })
  })
}

function getCompanyDetail(id) {
  return new Promise(function(resolve,reject){
    request(UrlPath.companyDetail+"?id="+id, "POST", null).then(function(r) {
      resolve(r)
    })
  })
}

function getStationDetail(id) {
  return new Promise(function(resolve,reject){
    request(UrlPath.stationDetail+"?id="+id, "POST", null).then(function(r) {
      resolve(r)
    })
  })
}

export {
  initMqttConnection,
  mqttSubscribe,
  mqttDisconnect,
  getMapPoint,
  getStaffDetail,
  getCompanyDetail,
  getStationDetail
}

