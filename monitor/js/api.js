(function(){

  const host = "http://202.118.26.7:8080/PowerCloud/api";

  // 封装一个get请求的方法
  function request(url, type, data) {
    return new Promise(function(resolve, reject) {
      var XHR = new XMLHttpRequest();


      XHR.open(type, host + url, true);
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


  /*function request(url, type, data, callback) {
    $.ajax({
      url: host + url,
      type: type,
      dataType: 'json',
      data: data,
      success: function(res) {
        if(res.succeeded) {
          var r = JSON.parse(res.data)
          callback(r)
        }
        else {
          alert("请求数据错误");
        }
      }
    })
  }*/

	/**/
  function mqttConnect(onMessageArrived) {
    var client = new Paho.MQTT.Client("202.118.26.129", Number(8083), "ttttt");//建立客户端实例
    client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
    function onConnect() {
        console.log("onConnected");
        client.subscribe("/a");//订阅主题
    }
    client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
    client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
            console.log("连接已断开");
         }
    }
    /*function onMessageArrived(message) {
      console.log("收到消息:"+message.payloadString);
    }*/
    /*// 发送消息
    message = new Paho.MQTT.Message("hello");
    message.destinationName = "/a";
    client.send(message);*/
  }

  function getMapPoint(type, callback) {

    return new Promise(function(resolve,reject){
      request("/electricitysubstation/getMapPoint?type="+type, "POST", null).then(function(r) {
        resolve(r)
      })
    })
   /* request("/electricitysubstation/getMapPoint", "POST", {type:type}, function(res){
      callback(res)
    })*/
    return
  	if(type == 1) {
  		arr = [
  			{
  				id: 1,
  				pos:[116.2945, 39.9100],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3255, 39.9005],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3185, 39.9205],
  				info: "testtest",
  				status: 0
  			},
  		]
  	}
  	else if(type == 2) {
  		arr = [
  			{
  				id: 1,
  				pos:[116.2945, 39.9110],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3245, 39.9015],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.2955, 39.9092],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3185, 39.9215],
  				info: "testtest",
  				status: 0
  			},
  		]
  	}
  	else if(type == 3) {
  		arr = [
  			{
  				id: 1,
  				pos:[116.2915, 39.9110],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3215, 39.9015],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.2925, 39.9092],
  				info: "testtest",
  				status: 0
  			},
  			{
  				id: 1,
  				pos:[116.3155, 39.9215],
  				info: "testtest",
  				status: 0
  			},
  		]
  	}
  	return arr;
  }


  function getStaffDetail(id) {
    console.log(id);
    return {
      id: 12345565657,
      name: "安琪拉",
      pic: "assets/pic.png",
      company: "铁西区人民政府",
      tel: 12345678,
      phone: 1345676891,
      status: 0
    }
  }

  function getCompanyDetail(id) {
    return {
      staffList: [
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 1},
        {name: "露娜", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 1},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 1},
        {name: "露娜", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 1},
        {name: "孙尚香", duty: "高级工程师", status: 0},
        {name: "孙尚香", duty: "高级工程师", status: 0}

      ],
      Ie: 15,
      stationsName: ["变电站1","变电站2","变电站3"]
    }
  }

  function getStationDetail(id) {
    return {
      sys: svg_data,
      Ie: 15,
      name: "变电站1"
    }
  }


  window.api = window.api || {}
  window.api.data = {
    getMapPoint: getMapPoint,
    mqttConnect: mqttConnect,
    getStaffDetail: getStaffDetail,
    getCompanyDetail: getCompanyDetail,
    getStationDetail: getStationDetail
  };
})()