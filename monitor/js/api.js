(function(){

	/*client = new Paho.MQTT.Client("202.118.26.129", Number(1883), "testid");//建立客户端实例
  client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
  function onConnect() {
      console.log("onConnected");
      client.subscribe("/topic_back");//订阅主题
  }
  client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
  client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
  function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
          console.log("连接已断开");
       }
  }
  function onMessageArrived(message) {
    console.log("收到消息:"+message.payloadString);
  }
  //发送消息
  message = new Paho.MQTT.Message("hello");
  message.destinationName = "/unique";
  client.send(message);*/

  function getMapPoint(type) {
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

  window.api = window.api || {}
  window.api.data = {};
  window.api.data.getMapPoint = getMapPoint;
})()