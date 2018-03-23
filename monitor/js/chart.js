(function() {

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

	function renderCompanyChart(detail) {

    var chartI = echarts.init($('#company-chart-i')[0],'macarons');
    var chartLoad = echarts.init($('#company-chart-load')[0],'macarons');

    var legendData = detail.stationsName;
    var stationsLen = legendData.length;

    chartI.setOption(initChartOption(stationsLen, 0, legendData));
    chartLoad.setOption(initChartOption(stationsLen, 1, legendData));

    //开始监听实时信息
    var seriesDataI = new Array(stationsLen);
    var xAxisDataI = [];

    var seriesDataLoad = new Array(stationsLen);
    var xAxisDataLoad = [];

    setInterval(function() {
      // window.api.data.mqttConnect(function(msg) {
      var msg = randomData();
      var new_opt_i = updateChartOption(stationsLen, 0, xAxisDataI, seriesDataI, msg)
      var new_opt_load = updateChartOption(stationsLen, 1, xAxisDataLoad, seriesDataLoad, msg)
      chartI.setOption(new_opt_i);
      chartLoad.setOption(new_opt_load);
      // })
    },1000)
	}


	function renderStationChart(detail) {
		var chartI = echarts.init($('#station-chart-i')[0],'macarons');
    var chartLoad = echarts.init($('#station-chart-load')[0],'macarons');

    var legendData = [detail.name];
    var stationsLen = 1;

    /*var o = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
    chartI.setOption(o)*/
    chartI.setOption(initChartOption(stationsLen, 0, legendData));
    chartLoad.setOption(initChartOption(stationsLen, 1, legendData));

    //开始监听实时信息
    var seriesDataI = new Array(stationsLen);
    var xAxisDataI = [];

    var seriesDataLoad = new Array(stationsLen);
    var xAxisDataLoad = [];

    setInterval(function() {

      // window.api.data.mqttConnect(function(msg) {
      var msg = randomData();
      var new_opt_i = updateChartOption(stationsLen, 0, xAxisDataI, seriesDataI, msg)
      var new_opt_load = updateChartOption(stationsLen, 1, xAxisDataLoad, seriesDataLoad, msg)
      chartI.setOption(new_opt_i);
      chartLoad.setOption(new_opt_load);
      // })
    },1000)
	}

	/**
	 * 生成初始化 chart option
	 * stationsLen: 变电站数量
	 * charType = 0 电流图
	 * charType = 1 载荷图
	**/
	function initChartOption(stationsLen, chartType, legendData) {
		var opt;
		var series = [];
		for(var i = 0 ; i < stationsLen; i++) {
      series.push({
        name: legendData[i] + (chartType == 0 ? "" : "载荷"),
        type: 'line',
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
    opt.yAxis.name = chartType == 0 ? "当前电流(A)" : "当前载荷(%)";
    if(stationsLen == 1) {
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
	      }],
	      outOfRange: {
	          color: '#f44336'
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
	function updateChartOption(stationsLen, chartType, xAxisData, seriesData, msg) {
		if(xAxisData.length >= MAX_LEN) {
      xAxisData.shift();
    }
    xAxisData.push(msg[0].time);
    for(var i = 0; i < stationsLen; i++) {
      if(!Array.isArray(seriesData[i])){
        seriesData[i] = [];
      }
      if(seriesData[i].length >= MAX_LEN) {
        seriesData[i].shift();
      }
      seriesData[i].push(chartType == 0 ? msg[i].value : msg[i].value*100/8);
    }

    var newSeries = [];
    for(var i = 0; i < stationsLen; i++) {
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



	function randomData() {
    var now = new Date();
    return [{
    	time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    	value: Math.round(Math.random() * 10)
    },
    {
      time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
      value: Math.round(Math.random() * 8)
    },
    {
      time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
      value: Math.round(Math.random() * 12)
    }]
	}

	window.api = window.api || {}
  window.api.chart = {
    renderCompanyChart: renderCompanyChart,
    renderStationChart: renderStationChart
  };

})()