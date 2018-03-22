(function() {

	function renderCompanyChart() {
		// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init($('#company-chart-i')[0],'macarons');

    var data = [];
    var time = [];
    // 指定图表的配置项和数据
    var option = {
	    /*title: {
	        text: '各变电站实时电流状态'
	    },*/
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
	    	left: '10%',
	    	bottom: '17%',
	    	top: 50,
	    },
	    xAxis: {
	    	name: '当前时间',
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
        data: time
	    },
	    yAxis: {
	    	name: '当前电流(A)',
        type: 'value',
        nameTextStyle: {
        	fontSize: 16
        },
        axisLine: {
        	lineStyle: {
        		color: '#fff'
        	}
        },
        /*boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }*/
	    },
	    series: [{
	        name: 'AA',
	        type: 'line',
	        showSymbol: true,
	        hoverAnimation: false,
	        data: []
	    },
	    {
	        name: 'BB',
	        type: 'line',
	        showSymbol: true,
	        hoverAnimation: false,
	        data: []
	    }]
	};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    /*window.api.data.mqttConnect(function(msg) {
    	// console.log(time);
    	data.push(randomData().value)
    	time.push(randomData().time)
	    myChart.setOption({
	    	xAxis: {
	    		data: time
	    	},
        series: [{
	        data: data
	    	}]
	    });
    })*/

    window.api.data.mqttConnect(function(msg) {
    	// console.log(time);
    	data.push(randomData().value)
    	time.push(randomData().time)
	    myChart.setOption({
	    	xAxis: {
	    		data: time
	    	},
        series: [{
	        data: data
	    	},
	    	{
	        data: data
	    	}]
	    });
    })
	}

	function randomData() {
    now = new Date();
    return {
    	time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    	value: Math.round(Math.random() * 21)
    }
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