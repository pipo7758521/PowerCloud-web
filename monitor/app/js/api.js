let HOST = "";
let MQTT_HOST = "202.118.26.129";
const MQTT_PORT = 8083;
let UrlPath = {};

var debug = process.env.NODE_ENV === 'development';

if(debug){
  UrlPath = {
    login: "",
    mapPoint1: "api/mapPoint1.json",
    mapPoint2: "api/mapPoint2.json",
    mapPoint3: "api/mapPoint3.json",
    staffDetail: "api/staffDetail.json",
    companyDetail: "api/companyDetail.json",
    stationDetail: "api/stationDetail.json",
  }
}
else {
  // HOST = "http://202.118.26.7:8080/PowerCloud/api";
  MQTT_HOST = "202.118.26.74";
  HOST = "/PowerCloud/api";
  UrlPath = {
    isLogin: "/user/getUserInfo",
    login: "/user/login",
    logout: "/user/logout",
    mapPoint: "/electricitysubstation/getMapPoint",
    staffDetail: "/electrician/profile",
    companyDetail: "/customer/getCompanyDetail",
    stationDetail: "/electricitysubstation/getStationDetail",
  }
}

// 封装一个get请求的方法
function request(url, type="GET", data) {
  return new Promise(function(resolve, reject) {
    fetch(HOST + url,{
      method: type,
      headers: {
        'Content-type': '"application/json; charset=utf-8"'
      },
      credentials: 'include',
      body: data
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      if(response.succeeded) {
        var data;
        try {
          data = typeof(response.data) == "string" ? JSON.parse(response.data) : response.data;
        } catch(e) {
          data = response.data;
        }
        resolve({
          ok: response.ok,
          data: data
        });
      }
      else {
        alert("请求数据错误");
        reject();
      }
    })
    .catch((err) => {
      alert("请求数据错误!");
      console.error("Error in fetch URL", err);
      reject();
    });
  })

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  function parseJSON(response) {
    return response.json();
  }
}

function initMqttConnection(callback, onMessageArrived) {
  var client = new Paho.MQTT.Client(MQTT_HOST, Number(MQTT_PORT), "webClient_"+Date.now());//建立客户端实例
  client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
  function onConnect() {
      console.log("mqtt onConnected");
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

function isLogin() {
  return new Promise(function(resolve,reject){
    request(UrlPath.isLogin, "POST", null).then(function(r) {
      resolve(r);
    }, function(err) {
      reject();
    })
  })
}

function login(account, password) {
  return new Promise(function(resolve,reject){
    if(!account || !password) {
      resolve({
        ok: false,
        data: "信息填写不完整"
      })
      return
    }
    request(UrlPath.login+"?account="+account+"&password="+password, "POST", null).then(function(r) {
      resolve(r)
    })
  })
}

function logout() {
  return new Promise(function(resolve,reject){
    request(UrlPath.logout, "POST", null).then(function(r) {
      resolve(r)
    })
  })
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
  isLogin,
  login,
  logout,
  getMapPoint,
  getStaffDetail,
  getCompanyDetail,
  getStationDetail
}

