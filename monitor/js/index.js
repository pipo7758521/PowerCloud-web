(function(){


	function bindEvent() {
		$("#btn-display").on("click", function(e) {
			$(".display-menu").toggleClass("active")
		})
	}


	window.onload = function() {
		api.map.init();
		bindEvent();
	}

})()

