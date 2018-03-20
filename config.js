(function () {
	//线路总配置
	window.config = [
		{
			capacityNum:2,
			distributingNum:3,
			circuitNum:2
		},
		{
			capacityNum:3,
			distributingNum:2,
			circuitNum:3
		},
		{
			capacityNum:3,
			distributingNum:2,
			circuitNum:7
		}
	];
	//是否级联
	window.isConnect = true;
	window.title = "XXXX变电所 - 电力系统图";
	window.data = [
		{
			vm: {
				Ua: 400,
				Ub: 200,
				Uc: 400
			},
			cabinet: {
				Uab: 400,
			  Ubc: 400,
			  Uac: 400,
			  Ia: 100,
			  Ib: 100,
			  Ic: 100,
			  cosφ: "75%",
			  status: 0,  //status = 0 --> 红色  !=0 --> 绿色
			},
			capacity: [
				{
					status: 0,
				},
				{
					status: 0,
				}
			],
			distributing: [
				[
					{
						Ia: 101,
					  Ib: 102,
					  Ic: 103,
					  status: 0,  //status = 0 --> 红色  !=0 --> 绿色
					},
					{
						Ia: 104,
					  Ib: 105,
					  Ic: 106,
					  status: 0,  //status = 0 --> 红色  !=0 --> 绿色
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
			capacity: [
				{
					status: 1,
				},
				{
					status: 1,
				},
				{
					status: 1,
				}
			],
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
	]

	// window.data = [data[0]]
})()