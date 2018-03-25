(function(){

	//显示按钮
	var btnDisplayJQ = $("#btn-display");
	var displayMenuJQ = $(".display-menu");

	var refreshBtn = $("#btn-refresh")

	var tagToggleJQ = $("#tag-toggle");

	var popJQs = $(".pop");
	var maskJQ = $("#mask");

	function bindEvent() {


		//坐标点显示/隐藏 点击
		btnDisplayJQ.on("click", function(e) {
			if(displayMenuJQ.hasClass("active")) {
				displayMenuJQ.toggleClass("active");
				setTimeout(function() {
					displayMenuJQ.hide();
				},300)
			}
			else {
				displayMenuJQ.show();
				setTimeout(function() {
					displayMenuJQ.toggleClass("active");
				},100)
			}
		});

		displayMenuJQ.on('click', 'li', function(event) {
			event.preventDefault();
			var i = $(this).index()
			api.map.togglePoints(i+1);
			$(this).toggleClass("checked");
		});

		//标签显示 隐藏
		tagToggleJQ.on('click', function(event) {
			event.preventDefault();

			if($(this).hasClass('toggle-off')){
				$(this).removeClass('toggle-off toggle-on');
				$(this).addClass('toggle-on');
				window.api.map.toggleTag(0);
			}
			else {
				$(this).removeClass('toggle-off toggle-on');
				$(this).addClass('toggle-off');
				window.api.map.toggleTag(1);
			}
		});

		//关闭窗口
		popJQs.on('click', '.x', function(event) {
			event.preventDefault();
			var popJQ =  $(this).parent();
			popJQ.removeClass("show");
			setTimeout(function () {
				popJQ.hide();
				updatePopLayout(popJQ);
			},500)
		});

		//刷新按钮
		refreshBtn.on('click', function(event) {
			event.preventDefault();
			refresh();
		});

		//系统图放大 缩小
		$("#pop-station-sys")
		.delegate('#btn-sys-down', 'click', function(event) {
			event.preventDefault();
			$("#pop-station").addClass('slide-down');
			$(this).hide();
			$("#btn-sys-up").show();
		})
		.delegate('#btn-sys-up', 'click', function(event) {
			event.preventDefault();
			$("#pop-station").removeClass('slide-down');
			$(this).hide();
			$("#btn-sys-down").show();
		});


	}

	//点击刷新，回归原始状态
	function refresh() {
		tagToggleJQ.removeClass('toggle-off toggle-on').addClass('toggle-off');

		displayMenuJQ.removeClass('active');
		displayMenuJQ.find("li").each(function(index, el) {
			if(!$(el).hasClass('checked')) {
				$(el).click();
			}
		});
		popJQs.removeClass("show");
		setTimeout(function () {
			popJQs.hide();
			updatePopLayout();
		},500)

		window.api.map.refresh();
	}

	function updatePopLayout(popJQ) {
		var allHide = true;
		popJQs.each(function(index, el) {
			console.log($(el).is(':visible'))
			allHide &= (!$(el).is(':visible'))
		});
		if(allHide){
			maskJQ.removeClass('show');
		}

		/*console.log(popJQ.attr("id"))
		if(popJQ.attr("id") == "pop-company-staff") {
			$("#company .pop-chart").addClass('wide');
			$("#company .pop-chart")[0].resize();
		}*/
	}

	//右上角时间显示
	function initTimer() {
		var now = new Date();
		$("#date").html([now.getFullYear(),now.getMonth()+1,now.getDate()].join("-"));
		$("#time").html([now.getHours(),now.getMinutes(),now.getSeconds()].join(":"));
		window.timer = setTimeout(initTimer, 1000)
	}

	window.onload = function() {

		api.map.init();
		refresh();

		bindEvent();

		initTimer();

	}

})()

