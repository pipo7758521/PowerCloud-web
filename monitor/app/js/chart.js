import {initMqttConnection, mqttSubscribe, mqttDisconnect} from './api.js';
require('./lib/macarons.js');

//最大窗口长度
const MAX_LEN = 10;
const COMMPON_OPT = {
  legend: {
    show: true,
    data: [],
    left: 10,
    top: '40%',
    orient: 'vertical',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false
    }
  },
  grid: {
    left: '15%',
    bottom: '17%',
    top: 50,
  },
  xAxis: {
    name: '',
    type: 'category',
    nameTextStyle: {
      fontSize: 16
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    boundaryGap: false,
    data: []
  },
  yAxis: {
    name: '',
    type: 'value',
    nameTextStyle: {
      fontSize: 16
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
  },
  series: []
};

var companyChartI, companyChartLoad;
var stationChartI, stationChartLoad;

//公共变量，数组，存储实时电流和载荷的数据
//因为页面中只会显示一个种类的数据，即：企业的数据 或者 变电站的数据
//所以他们共用一个变量
var g_seriesDataI, g_xAxisDataI;
var g_seriesDataLoad, g_xAxisDataLoad;

var g_stationsLen;
var g_Ie;

const MQTT_TOPIC = "/companyCurrent";
var g_clientCurrent;  //电流的 mqtt client , 同一时间有且只有一个
var g_companyCurrent = {}; //某个企业下，所有变电站的当前电流信息，用于同步时钟，画折线图
var g_timer;

function renderCompanyChart(detail) {
  var companyId = detail.id;
  var stationList = detail.stationsName;

	g_Ie = detail.Ie;

  companyChartI = echarts.init($('#company-chart-i')[0],'macarons');
  companyChartLoad = echarts.init($('#company-chart-load')[0],'macarons');

  var legendData = [];
  stationList.forEach(function(s,i) {
  	legendData.push(s.name);
  });
  g_stationsLen = legendData.length;

  companyChartI.setOption(initChartOption(0, legendData));
  companyChartLoad.setOption(initChartOption(1, legendData));

  g_seriesDataI = new Array(g_stationsLen);
  g_xAxisDataI = [];

  g_seriesDataLoad = new Array(g_stationsLen);
  g_xAxisDataLoad = [];

  clearClient();
  g_companyCurrent = {};
  initMqttConnection(function(client) {
    g_clientCurrent = client;
    var topic = MQTT_TOPIC+"/"+companyId+"/#";
    topic = "/a";
    mqttSubscribe(g_clientCurrent, topic);
  }, onMessageArrived);

  //这里收到该企业下，所有变电站发来的消息
  function onMessageArrived(msg) {
    //判断是哪个变电站 TODO
    console.log(msg);
    try {
    	var topic = msg.destinationName;
      var stationId = (topic.split("/"))[2] || 1;
      g_companyCurrent["id_"+stationId] = (randomData()).value;
    } catch(e){console.log("Error: error in onMessageArrived", e)}
  }

  //起一个定时器，每五秒钟读一次g_companyCurrent里的电流
  clearInterval(g_timer);
  g_timer = setInterval(function() {
    var msg = [];
    stationList.forEach(function(o,i) {
      if(o.id) {
        msg.push({value: g_companyCurrent["id_"+o.id] || 0});//如果没有电流，则写为0
      }
    })
    var new_opt_i = updateChartOption(0, msg, g_xAxisDataI, g_seriesDataI);
    var new_opt_load = updateChartOption(1, msg, g_xAxisDataLoad, g_seriesDataLoad);
    companyChartI.setOption(new_opt_i);
    companyChartLoad.setOption(new_opt_load);
  }, 5000);

  /*setInterval(function() {
    // mqttConnect(function(msg) {
    var msg = randomData();
    var new_opt_i = updateChartOption(detail, stationsLen, 0,msg)
    var new_opt_load = updateChartOption(detail, stationsLen, 1, msg)
    companyChartI.setOption(new_opt_i);
    companyChartLoad.setOption(new_opt_load);
    // })
  },1000)*/
}

function renderStationChart(detail) {
  g_Ie = 10 || detail.Ie;

  var stationId = detail.id;
  var companyId = detail.companyId;

	var chartI = echarts.init($('#station-chart-i')[0],'macarons');
  var chartLoad = echarts.init($('#station-chart-load')[0],'macarons');

  var legendData = [detail.name];
  g_stationsLen = 1;

  chartI.setOption(initChartOption(0, legendData));
  chartLoad.setOption(initChartOption(1, legendData));

  //开始监听实时信息
  g_seriesDataI = new Array(g_stationsLen);
  g_xAxisDataI = [];

  g_seriesDataLoad = new Array(g_stationsLen);
  g_xAxisDataLoad = [];


  clearClient();

  initMqttConnection(function(client) {
		g_clientCurrent = client;
    var topic = MQTT_TOPIC+"/"+companyId+"/"+stationId;
    var topic = "/a";
    mqttSubscribe(g_clientCurrent, topic);
	}, onMessageArrived);


  function onMessageArrived(msg) {
    var msg = [
      {
        value: (randomData()).value
      }
    ];
    var new_opt_i = updateChartOption(0, msg, g_xAxisDataI, g_seriesDataI);
    var new_opt_load = updateChartOption(1, msg, g_xAxisDataLoad, g_seriesDataLoad);
    chartI.setOption(new_opt_i);
    chartLoad.setOption(new_opt_load);
  }
  /*setInterval(function() {

    // mqttConnect(function(msg) {
    var msg = randomData();
    var new_opt_i = updateChartOption(0, msg, g_xAxisDataI, g_seriesDataI);
  	var new_opt_load = updateChartOption(1, msg, g_xAxisDataLoad, g_seriesDataLoad);
    chartI.setOption(new_opt_i);
    chartLoad.setOption(new_opt_load);
    // })
  },1000)*/
}

/**
 * 生成初始化 chart option
 * stationsLen: 变电站数量
 * charType = 0 电流图
 * charType = 1 载荷图
**/
function initChartOption(chartType, legendData) {
	var opt;
	var series = [];
	for(var i = 0 ; i < g_stationsLen; i++) {
    series.push({
      name: legendData[i] + (chartType == 0 ? "" : "载荷"),
      type: 'line',
      smooth: true,
      showSymbol: true,
      hoverAnimation: false,
      data: [],
      markLine: (function(){
      	var obj = null;
      	if(chartType != 0) {
      		obj = {
	          silent: true,
	          data: [{
	              yAxis: 80
	          }, {
	              yAxis: 100
	          }]
      		}
      	}
      	return obj;
      })(),
    })
  }
  opt =  $.extend(true, {}, COMMPON_OPT);
  opt.xAxis.name = "时间";
  if(chartType == 0) {
    opt.yAxis.name = "当前电流(A)";
  }
  else {
    opt.yAxis.name = "当前载荷(%)";
    opt.yAxis.axisLabel = {formatter: '{value} %'};
  }

  if(g_stationsLen == 1) {
  	opt.legend = null;
  	opt.grid.left = '8%';
  }
  else {
  	opt.legend.data = legendData.map(function(o){return chartType == 0 ? o : o+"载荷"});
  }

  opt.series = series;
  if(chartType != 0) {
  	opt.visualMap =  {
      top: 10,
      right: 10,
      pieces: [{
          gt: 0,
          lte: 80,
          color: '#096'
      }, {
          gt: 80,
          lte: 100,
          color: '#ffde33'
      }, {
          gt: 100,
          color: '#f44336'
      }],
      outOfRange: {
          color: '#f44336'
      },
      textStyle: {
        color: '#fff'
      }
    }
  }
  return opt;
}

/**
 * 生成实时更新的 chart option
 * stationsLen: 变电站数量
 * charType = 0 电流图
 * charType = 1 载荷图
**/
function updateChartOption(chartType, msg, xAxisData, seriesData) {
	//维护长度为MAX_LEN的窗口
  if(xAxisData.length >= MAX_LEN) {
    xAxisData.shift();
  }
  //横轴:时间
  var now = new Date();
  var time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
  // xAxisData.push(msg[0].time);
  xAxisData.push(time);

  for(var i = 0; i < g_stationsLen; i++) {
    if(!Array.isArray(seriesData[i])){
      seriesData[i] = [];
    }
    if(seriesData[i].length >= MAX_LEN) {
      seriesData[i].shift();
    }
    //charttype==1 要除以额定电压
    seriesData[i].push(chartType == 0 ? msg[i].value : msg[i].value*100/g_Ie);
  }

  var newSeries = [];
  for(var i = 0; i < g_stationsLen; i++) {
    newSeries[i] = {
      data: seriesData[i]
    }
  }

  return {
  	xAxis: {
      data: xAxisData
    },
    series: newSeries
  }
}

function clearClient() {
  if(g_clientCurrent){
  	mqttDisconnect(g_clientCurrent);
    g_clientCurrent = null;
  }
}



function randomData() {
  return {
    value: Math.round(Math.random() * 10)
  };
 /* return [{
  	// time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
  	value: Math.round(Math.random() * 10)
  },
  {
    // time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    value: Math.round(Math.random() * 8)
  },
  {
    // time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    value: Math.round(Math.random() * 12)
  }]*/
}

export {
  renderCompanyChart,
  renderStationChart,
  clearClient
};
