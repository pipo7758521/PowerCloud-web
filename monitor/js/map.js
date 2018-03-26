(function(){

	window.map;
	window.mapMgr1;
	window.mapMgr2;
	window.mapMgr3;

  var totalPoint = [];

	var point_arr = [];

	function initMap() {
    // 百度地图API功能
    //地图不可点
    var mapOpts = {enableMapClick:false}
    map = new BMap.Map("allmap", mapOpts);    // 创建Map实例

    map.setMapStyle({
      styleJson:mapStyle
    });

    // var mapStyle={  style : "midnight" }
    // map.setMapStyle(mapStyle);


    map.centerAndZoom(new BMap.Point(123.4, 41.8), 14);  // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("沈阳");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    var h = $(window).height() - 290;
    var ctrlOpts = {offset: new BMap.Size(10, h)}
    map.addControl(new BMap.NavigationControl(ctrlOpts));   //缩放按钮

    renderPoint();

 //    var pt = new BMap.Point(116.417, 39.909);
	// var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
	// var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	// map.addOverlay(marker2);              // 将标注添加到地图中


  }


  function renderPoint() {
  	mapMgr1 = new BMapLib.MarkerManager(map,{borderPadding: 10,maxZoom: 21, trackMarkers: true});
  	mapMgr2 = new BMapLib.MarkerManager(map,{borderPadding: 10,maxZoom: 21, trackMarkers: true});
  	mapMgr3 = new BMapLib.MarkerManager(map,{borderPadding: 10,maxZoom: 21, trackMarkers: true});

  	var markers1 = [];
  	var markers2 = [];
  	var markers3 = [];

  	var points1 = [];
  	var points2 = [];
  	var points3 = [];

  	//企业
    Promise.all([api.data.getMapPoint(1),api.data.getMapPoint(2),api.data.getMapPoint(3)])
    .then(function(res_arr){


      res_arr[0].forEach( (o,i) => {
        var pos = JSON.parse(o.pos);
        var convertor = coorConvert.wgs2bd(pos.lng, pos.lat);

        points1.push(new BMap.Point(convertor[0], convertor[1]));
        var html = "<div class='p p-company' data-id='"+o.id+"' data-pos='"+convertor.join("|")+"'><span class='p-tag'>企业："+o.tag+"</span></div>";
        // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
        // var marker = new BMap.Marker(points1[i]);  // 创建标注
        var marker = new BMapLib.RichMarker(html, points1[i]);
        // var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
        // marker.setLabel(label);
        markers1.push(marker);
      })
      mapMgr1.addMarkers(markers1,1,20)
      mapMgr1.showMarkers();

      res_arr[1].forEach( (o,i) => {
        var pos = JSON.parse(o.pos);
        var convertor = coorConvert.wgs2bd(pos.longitude, pos.latitude);
        points2.push(new BMap.Point(convertor[0], convertor[1]));
        var html = "<div class='p p-station' data-id='"+o.id+"' data-pos='"+convertor.join("|")+"'><span class='p-tag'>变电站:"+o.tag+"</span></div>";
        markers2.push(new BMapLib.RichMarker(html, points2[i]))
      })
      mapMgr2.addMarkers(markers2,1,20)
      mapMgr2.showMarkers();


      res_arr[2].forEach( (o,i) => {
        var pos = JSON.parse(o.pos);
        var convertor = coorConvert.wgs2bd(pos.longitude, pos.latitude);
        points3.push(new BMap.Point(convertor[0], convertor[1]));
        var html = "<div class='p p-staff' data-id='"+o.id+"' data-pos='"+convertor.join("|")+"'><span class='p-tag'>员工:"+o.tag+"</span></div>";
        var marker = new BMapLib.RichMarker(html, points3[i]);
        markers3.push(marker);
      })
      mapMgr3.addMarkers(markers3,1,20)
      mapMgr3.showMarkers();

      totalPoint = (points1.concat(points2)).concat(points3)
      map.setViewport(totalPoint);

      // if($("#tag-toggle").hasClass('toggle-off')){
      //   $(".p-tag").addClass('off')
      // }


      bindEvent();

    })

  }

  function bindEvent() {
    $(".p-staff").on('click', handleStaffClick);
    $(".p-company").on('click', handleCompanyClick);
    $(".p-station").on('click', handleStationClick);

    // tagEvent;
    $(".p-staff, .p-company, .p-station")
    .on('mouseenter', function(event) {
      if(!$("#tag-toggle").hasClass('toggle-off')){
        return
      }
      $(this).find(".p-tag").addClass('on');
    })
    .on('mouseleave', function(event) {
      if(!$("#tag-toggle").hasClass('toggle-off')){
        return
      }
      $(this).find(".p-tag").removeClass('on')
    });

  }

  //type=0 on , type=1 off
  function toggleTag(type) {
    if(type == 0) {
      $(".p-tag").addClass('on');
    }
    else if(type == 1){
      $(".p-tag").removeClass('on')
    }
  }

  function handleStaffClick(event) {
    event.preventDefault();

    var _this = $(this);

    _this.find(".p-tag").removeClass('on');

    pointClickAnimation(_this);

    window.api.data.getStaffDetail(_this.attr("data-id"))
    .then(function(detail) {
      console.log(detail)
      window.api.pop.popStaffDetail(detail);
    })
    // map.centerAndZoom(new BMap.Point(pos[0], pos[1]), 16);

    // var style =_this.parent()[0].style;

  }


  function handleCompanyClick(event) {
    event.preventDefault();

    var _this = $(this)
    _this.find(".p-tag").removeClass('on');

    pointClickAnimation(_this);

    setTimeout(function() {
      window.api.data.getCompanyDetail(_this.attr("data-id"))
      .then(function(detail) {
        console.log(detail)
        window.api.pop.popCompanyDetail(detail);
      })
    },1500);
  }

  function handleStationClick(event) {
    event.preventDefault();

    var _this = $(this)
    _this.find(".p-tag").removeClass('on');

    pointClickAnimation(_this);

    var detail = window.api.data.getStationDetail(_this.attr("data-id"));
    window.api.pop.popStationDetail(detail);
  }

  //点击坐标点的动画：放大并移到窗口正中 ，动画时长2s
  function pointClickAnimation(pointJQ) {
    var pos = pointJQ.attr("data-pos").split("|");
    map.panTo(new BMap.Point(pos[0], pos[1]));//定位到所点击的位置

    pointJQ.addClass('here');
    setTimeout(function() {pointJQ.removeClass('here');},2100);
  }
  //显示隐藏坐标点
  function togglePoints(type) {
  	if(type == 1) {
  		mapMgr1.toggle();
  	}
  	else if(type == 2) {
  		mapMgr2.toggle();
  	}
  	else if(type == 3) {
  		mapMgr3.toggle();
  	}
  }

  function refresh() {
    if(totalPoint.length) map.setViewport(totalPoint);
  }

  window.api = window.api || {}
  window.api.map = {
    init: initMap,
    togglePoints: togglePoints,
    toggleTag: toggleTag,
    refresh: refresh
  };

})()