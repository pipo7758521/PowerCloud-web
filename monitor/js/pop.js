(function(){

	function popStaffDetail(detail) {
		var popJQ = $("#pop-staff");
		var html = `<div class="pic"><img src="${detail.pic}"></div>
				        <div class="info">
				        	<p class="name">员工ID：${detail.id}</p>
				          <p class="name">员工姓名：${detail.name}</p>
				          <p class="name">所属公司：${detail.company}</p>
				          <p class="name">公司电话：${detail.tel}</p>
				          <p class="name">移动电话：${detail.phone}</p>
				          <p class="name">在岗状态：${detail.status}</p>
				        </div>`
		popJQ.find(".content").html(html);
		// popJQ[0].style.left = "55%";
		// popJQ[0].style.top = "25%";
		popJQ.show();
		setTimeout(function() {
			popJQ.addClass('show');
		},100)
	}


  function popCompanyDetail(detail) {
  	maskShow();
  	var popJQ = $("#pop-company-staff");

  	//员工列表
  	popJQ.find(".staff-num").html("");
  	var staffList = detail.staffList;
  	var html_arr = [];
  	staffList.forEach(function(o, i) {
  		html_arr.push(`<li>
					            <span class="name">${o.name}</span>
					            <span class="duty">${o.duty}</span>
					            <span class="status">在岗状态：<i class="fa ${o.status == 0 ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i></span>
					          </li>`)
  	})
  	popJQ.find("ul").html(html_arr.join(""));
  	popJQ.addClass('show');

  	$("#pop-company-i").addClass('show');
  	$("#pop-company-load").addClass('show');

  	window.api.chart.renderCompanyChart(detail);
  }


  function maskShow(){
  	$("#mask").addClass('show');
  }







  window.api = window.api || {}
  window.api.pop = {
    popStaffDetail: popStaffDetail,
    popCompanyDetail: popCompanyDetail
  };

})()