(function(){

	function popStaffDetail(detail) {
		// maskShow();
		var popJQ = $("#pop-staff");
		var html = `<div class="pic"><img src="${detail.pic}"></div>
				        <div class="info">
				        	<p class="name">员工ID：${detail.id}</p>
				          <p class="name">员工姓名：${detail.name}</p>
				          <p class="name">所属公司：${detail.company}</p>
				          <p class="name">公司电话：${detail.tel}</p>
				          <p class="name">移动电话：${detail.phone}</p>
				          <p class="status">在岗状态：<i class="fa ${detail.status == 0 ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i></p>
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
  	var iJQ = $("#pop-company-i");
  	var loadJQ = $("#pop-company-load");
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

  	popJQ.show();
  	iJQ.show();
  	loadJQ.show();
		setTimeout(function() {
			popJQ.addClass('show');
			setTimeout(function() {
				iJQ.addClass('show');
  			setTimeout(function() {
	  			loadJQ.addClass('show');
				},100)
			},100)
		},100);

  	window.api.chart.renderCompanyChart(detail);
  }

  function popStationDetail(detail) {
  	maskShow();
  	//系统图
  	var popJQ = $("#pop-station-sys");
  	var sysJQ = $("#station-sys");
  	var iJQ = $("#pop-station-i");
  	var loadJQ = $("#pop-station-load");

  	sysJQ.html(detail.sys);
	  $("#station-sys svg")[0].style.transform = "rotate(0)";
	  setInterval(function() {
 		// window.api.data.mqttConnect(function(msg) {
 			console.log("update data")
 			setSysData(sys_data, detail.name + " - " + "电力系统图")
    },3000)

  	popJQ.show();
  	iJQ.show();
  	loadJQ.show();
		setTimeout(function() {
			popJQ.addClass('show');
			setTimeout(function() {
				iJQ.addClass('show');
  			setTimeout(function() {
	  			loadJQ.addClass('show');
				},100)
			},100)
		},100);

  	//电流图
	  //载荷图
	  window.api.chart.renderStationChart(detail);



  }

  function setSysData(data,title) {
		if(title) {
			document.querySelector(".s-t-title tspan").innerHTML = title;
		}

		var groupEle = document.querySelectorAll(".s-group");
		var vmEle = document.querySelectorAll(".s-t-vm tspan");
		var cabinetEle = document.querySelectorAll(".s-t-cabinet");
		var circuitEle = document.querySelectorAll(".s-t-circuit");
		//所有电表
		var rectEle = document.querySelectorAll(".s-rect");

		data.forEach( (item,i) => {
			var info1 = "";
			for( var o in item.vm) {
				info1 += o+": "+(item.vm)[o]+" ";
			}
			vmEle[i].innerHTML = info1;

			//进线柜信息
			var cab_nodes = cabinetEle[i].childNodes;
			cab_nodes[0].innerHTML = "Uab: "+ item.cabinet.Uab;
			cab_nodes[1].innerHTML = "Ubc: "+ item.cabinet.Ubc;
			cab_nodes[2].innerHTML = "Uac: "+ item.cabinet.Uac;
			cab_nodes[3].innerHTML = "Ia: "+ item.cabinet.Ia;
			cab_nodes[4].innerHTML = "Ib: "+ item.cabinet.Ib;
			cab_nodes[5].innerHTML = "Ic: "+ item.cabinet.Ic;
			cab_nodes[6].innerHTML = "cosφ: "+ item.cabinet.cosφ;
			//进线柜 电表颜色
			setColor(document.querySelectorAll(".s-cab-rect")[i],item.cabinet.status);

			/*//电容柜 电表颜色
			item.capacity.forEach( (ca, ca_i) => {
				var caEle = groupEle[i].querySelectorAll(".s-cap-rect")[ca_i];
				setColor(caEle,item.cabinet.status);
			})*/

			//配电柜信息
			var distributing = item.distributing
			distributing.forEach( (d,d_i) => {
				d.forEach( (c,c_i) => {
					var _i = i*data.length*d.length + d_i*d.length + c_i;
						var circuit_nodes= circuitEle[_i].childNodes;
					circuit_nodes[0].innerHTML = "Ia: "+ c.Ia;
					circuit_nodes[1].innerHTML = "Ib: "+ c.Ib;
					circuit_nodes[2].innerHTML = "Ic: "+ c.Ic;

					var cirEle = document.querySelectorAll(".s-rect")[_i];
					setColor(cirEle,c.status);

				})
			})
		})

		function setColor(ele,status) {
			ele.setAttribute("fill",status == 0 ? "#e53935" : "#4caf50");
		}
	}




  function maskShow(){
  	$("#mask").addClass('show');
  }







  window.api = window.api || {}
  window.api.pop = {
    popStaffDetail: popStaffDetail,
    popCompanyDetail: popCompanyDetail,
    popStationDetail: popStationDetail
  };

})()