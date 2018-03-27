(function(){

  const HOST = "http://202.118.26.7:8080/PowerCloud/api";
  const MQTT_HOST = "202.118.26.129";
  const MQTT_PORT = 8083;
  // var client;
  // var isMqttConnected = false;

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
                  var r = JSON.parse(response.data);
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
      // request("/electricitysubstation/getMapPoint?type="+type, "POST", null).then(function(r) {
        var arr;
        if(type == 1) {
          arr = [
            {
              id: 1,
              pos:`{"lng": "116.2945", "lat": "39.9100"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 1,
              pos:`{"lng": "116.3255", "lat": "39.9005"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 1,
              pos:`{"lng": "116.3185", "lat": "39.9205"}`,
              tag: "testtest",
              status: 0
            },
          ]
        }
        else if(type == 2) {
          arr = [
            {
              id: 1,
              pos:`{"longitude": "116.2945", "latitude": "39.9110"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 2,
              pos:`{"longitude": "116.3245", "latitude": "39.9015"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 3,
              pos:`{"longitude": "116.2955", "latitude": "39.9080"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 4,
              pos:`{"longitude": "116.3185", "latitude": "39.9215"}`,
              tag: "testtest",
              status: 0
            },
          ]
        }
        else if(type == 3) {
          arr = [
            {
              id: 1,
              pos:`{"longitude": "116.2915", "latitude": "39.9010"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 2,
              pos:`{"longitude": "116.3215", "latitude": "39.9015"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 3,
              pos:`{"longitude": "116.2925", "latitude": "39.9092"}`,
              tag: "testtest",
              status: 0
            },
            {
              id: 4,
              pos:`{"longitude": "116.3155", "latitude": "39.9205"}`,
              tag: "testtest",
              status: 0
            },
          ]
        }
        resolve(arr)
      // })
    })
    return

  	return arr;
  }


  function getStaffDetail(id) {
    return new Promise(function(resolve,reject){
      // request("/electrician/profile?id="+id, "POST", null).then(function(r) {
        var r = {
          id: 12345565657,
          name: "安琪拉",
          pic: "assets/pic.png",
          company: "铁西区人民政府",
          tel: 12345678,
          phone: 1345676891,
          status: 0
        }
        resolve(r)
      // })
    })
  }

  function getCompanyDetail(id) {
    return new Promise(function(resolve,reject){
      // request("/customer/getCompanyDetail?id="+id, "POST", null).then(function(r) {
        var r = {
          staffList: [
            {name: "孙尚香", duty: "高级工程师", status: 0},
            {name: "孙尚香", duty: "高级工程师", status: 1},
            {name: "露娜", duty: "高级工程师", status: 0},
            {name: "孙尚香", duty: "高级工程师", status: 0},
            {name: "孙尚香", duty: "高级工程师", status: 0},
          ],
          Ie: 15,
          stationsName: [
            {id:1, name:"变电站1"},
            {id:2, name:"变电站2"},
            {id:3, name:"变电站3"}
          ]
        }
        resolve(r)
      // })
    })
  }

  function getStationDetail(id) {
    return new Promise(function(resolve,reject){
      // request("/electricitysubstation/getStationDetail?id="+id, "POST", null).then(function(r) {
        var r = {
          id: 1,
          companyId: 1,
          sys: svg_data,
          Ie: 15,
          name: "变电站1"
        }
        resolve(r)
      // })
    })
  }


  window.api = window.api || {}
  window.api.data = {
    initMqttConnection: initMqttConnection,
    mqttSubscribe: mqttSubscribe,
    mqttDisconnect: mqttDisconnect,

    getMapPoint: getMapPoint,
    getStaffDetail: getStaffDetail,
    getCompanyDetail: getCompanyDetail,
    getStationDetail: getStationDetail
  };
})()