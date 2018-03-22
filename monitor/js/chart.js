(function() {

  var common_opt = {
    legend: {
      show: true,
      data: ['AA','BB'],
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

    // var detail = window.api.data.getCompanyDetail();
		// 基于准备好的dom，初始化echarts实例
    var chartI = echarts.init($('#company-chart-i')[0],'macarons');
    var chartLoad = echarts.init($('#company-chart-load')[0],'macarons');

    var legendData = detail.stationsName;
    var seriesI = [];
    var seriesLoad = [];

    var stationsLen = legendData.length;
    for(var i = 0 ; i < stationsLen; i++) {
      seriesI.push({
        name: legendData[i],
        type: 'line',
        showSymbol: true,
        hoverAnimation: false,
        data: []
      })
      seriesLoad.push({
        name: legendData[i]+"载荷",
        type: 'line',
        showSymbol: true,
        hoverAnimation: false,
        markLine: {
          silent: true,
          data: [{
              yAxis: 80
          }, {
              yAxis: 100
          }]
        },
        data: []
      })
    }

    // 电流
    var optionI =  $.extend(true, {}, common_opt);
    optionI.xAxis.name = "时间";
    optionI.yAxis.name = "当前电流(A)";
    optionI.legend.data = legendData;
    optionI.series = seriesI;
    chartI.setOption(optionI);

    //载荷
    var optionLoad =  $.extend(true, {}, common_opt);
    optionLoad.xAxis.name = "时间";
    optionLoad.yAxis.name = "当前载荷(%)";
    optionLoad.legend.data = legendData.map(function(o){return o+"载荷"});
    optionLoad.series = seriesLoad;
    optionLoad.visualMap =  {
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
    chartLoad.setOption(optionLoad);

    //最大窗口长度
    var maxLen = 10;

    var seriesDataI = new Array(stationsLen);
    var xAxisDataI = [];

    var seriesDataLoad = new Array(stationsLen);
    var xAxisDataLoad = [];

    setInterval(function() {
      // window.api.data.mqttConnect(function(msg) {

        var msg = randomData();

        if(xAxisDataI.length >= maxLen) {
          xAxisDataI.shift();
          xAxisDataLoad.shift();
        }
        xAxisDataI.push(msg[0].time);
        xAxisDataLoad.push(msg[0].time);
        for(var i = 0; i < stationsLen; i++) {
          if(!Array.isArray(seriesDataI[i])){
            seriesDataI[i] = [];
            seriesDataLoad[i] = [];
          }

          if(seriesDataI[i].length >= maxLen) {
            seriesDataI[i].shift();
            seriesDataLoad[i].shift();
          }
          seriesDataI[i].push(msg[i].value);
          seriesDataLoad[i].push(msg[i].value*100/8);
        }

        var newSeriesI = [];
        var newSeriesLoad = [];
        for(var i = 0; i < stationsLen; i++) {
          newSeriesI[i] = {
            data: seriesDataI[i]
          }
          newSeriesLoad[i] = {
            data: seriesDataLoad[i]
          }
        }

        chartI.setOption({
          xAxis: {
            data: xAxisDataI
          },
          series: newSeriesI
        });
        chartLoad.setOption({
          xAxis: {
            data: xAxisDataLoad
          },
          series: newSeriesLoad
        });
      // })
    },1000)

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
    /*return {
      name: now.toString(),
      value: [
          [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
          Math.round(Math.random() * 21 - 10)
      ]
    }*/
	}

	window.api = window.api || {}
  window.api.chart = {
    renderCompanyChart: renderCompanyChart,
  };

})()