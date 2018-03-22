(function(){

	function popStaffDetail(data) {
		var popJQ = $("#pop-staff");
		var html = `<div class="pic"><img src="${data.pic}"></div>
				        <div class="info">
				        	<p class="name">员工ID：${data.id}</p>
				          <p class="name">员工姓名：${data.name}</p>
				          <p class="name">所属公司：${data.company}</p>
				          <p class="name">公司电话：${data.tel}</p>
				          <p class="name">移动电话：${data.phone}</p>
				          <p class="name">在岗状态：${data.status}</p>
				        </div>`
		popJQ.find(".content").html(html);
		// popJQ[0].style.left = "55%";
		// popJQ[0].style.top = "25%";
		popJQ.show();
		setTimeout(function() {
			popJQ.addClass('show');
		},100)
	}
	window.api = window.api || {}
  window.api.pop = {
    popStaffDetail: popStaffDetail
  };

})()