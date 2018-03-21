(function(){
	var title = "铁西区人民政府主变电所 电力系统图";

	/*
	 * data为数组形式，数组中每一项表示单个系统图的参数配置
	 * 如该系统图为2个级联的形式，则data = [ {}, {} ]
	*/
	var data = [
		{
			//总电压
			vm: {
				Ua: 400,
				Ub: 200,
				Uc: 400
			},
			//进线柜 各项参数
			cabinet: {
				Uab: 400,
			  Ubc: 400,
			  Uac: 400,
			  Ia: 100,
			  Ib: 100,
			  Ic: 100,
			  cosφ: "75%",
			  status: 0,  //电表颜色 status = 0 --> 红色  status !=0 --> 绿色
			},
			//配线柜参数，为数组形式，每一项对应一个配线柜
			distributing: [
				[ //每一个配线柜中有N个回路，该数组长度应为N，其中每一项{}代表一个回路的参数
					{
						Ia: 101,
					  Ib: 102,
					  Ic: 103,
					  status: 0,  //电表颜色 status = 0 --> 红色  status !=0 --> 绿色
					},
					{
						Ia: 104,
					  Ib: 105,
					  Ic: 106,
					  status: 0,  //电表颜色 status = 0 --> 红色  status !=0 --> 绿色
					}
				],
				[
					{
						Ia: 107,
					  Ib: 108,
					  Ic: 109,
					  status: 0,
					},
					{
						Ia: 110,
					  Ib: 111,
					  Ic: 112,
					  status: 0,
					}
				],
				[
					{
						Ia: 113,
					  Ib: 114,
					  Ic: 115,
					  status: 0,
					},
					{
						Ia: 116,
					  Ib: 117,
					  Ic: 118,
					  status: 0,
					}
				]
			]
		},
		//第二个电路
		{
			vm: {
				Ua: 401,
				Ub: 201,
				Uc: 401
			},
			cabinet: {
				Uab: 401,
			  Ubc: 402,
			  Uac: 403,
			  Ia: 101,
			  Ib: 102,
			  Ic: 103,
			  cosφ: "85%",
			  status: 1,
			},
			distributing: [
				[
					{
						Ia: 119,
					  Ib: 120,
					  Ic: 121,
					  status: 0,
					},
					{
						Ia: 122,
					  Ib: 123,
					  Ic: 124,
					  status: 0,
					},
					{
						Ia: 125,
					  Ib: 126,
					  Ic: 127,
					  status: 0,
					}
				],
				[
					{
						Ia: 128,
					  Ib: 129,
					  Ic: 130,
					  status: 1,
					},
					{
						Ia: 131,
					  Ib: 132,
					  Ic: 133,
					  status: 0,
					},
					{
						Ia: 134,
					  Ib: 135,
					  Ic: 136,
					  status: 1,
					}
				]
			]
		}
	];

	function setData(data,title) {
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
	}

	function setColor(ele,status) {
		ele.setAttribute("fill",status == 0 ? "#e53935" : "#4caf50");
	}

	window.title = title;
	window.data = data;
	window.setData = setData;
})()