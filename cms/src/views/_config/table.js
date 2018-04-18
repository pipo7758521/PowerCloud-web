/**
 * @author arenceli
 * @description [配置所有数据库表的字段，和关联父子关系]
 * @Datetime 2018-04-17
 */
export default {
	//基础配置
	typeDevice: {
		column: [
  		{
  			key: "id",
  			label: "ID",
  			type: "number",
  			isEdit: false,
  			mainKey: true,   //主键！！！ 用于删除
  		},
  		{
  			key: "typedevicename",
  			label: "设备名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
  			key: "functionname",
  			label: "解析函数名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
  			key: "classname",
  			label: "解析类名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
  			key: "description",
  			label: "备注说明",
  			type: "string",
  		}
  	]
	},
	magDomain: {
		column: [
  		{
  			key: "id",
  			label: "ID",
  			type: "number",
  			isEdit: false,
  			mainKey: true,   //主键！！！ 用于删除
  		},
  		{
  			key: "magdomain",
  			label: "管理域名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
  			key: "createrid",
  			label: "创建人",
  			type: "string",
  			isEdit: false,
  		},
  		{
  			key: "createtime",
  			label: "创建时间",
  			type: "date",
  			isEdit: false,
  		},
  		{
  			key: "status",
  			label: "状态",
  			type: "select",
        required: true,
        errorMessage: "必填",
        default: "0",
        options: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "停用"
          }
        ]
  		}
  	],
    subTable: [{
      path: "magDomain_electricitySubstation",
      button: "配置变电所"
    }]
	},
	magDomain_electricitySubstation: {
		column: [
  		{
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
      },
      {
  			key: "magdomainid",
  			label: "管理域ID",
  			type: "number",
        isEdit: false,
        // isVisible: false,
  			required: true,
        errorMessage: "必填"
  		},
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "select",
        required: true,
        errorMessage: "必填"
      },
  		{
  			key: "status",
  			label: "状态",
  			type: "select",
        default: "0",
        options: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "停用"
          }
        ]
  		}
  	]
	},
	//网关配置
	deviceGateway: {
		column : [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
      },
      {
        key: "gatewayname",
        label: "网关名称",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string",
        // required: true,
        // errorMessage: "必填"
      },
      {
        key: "mac",
        label: "MAC地址",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "subjectid",
        label: "订阅主题ID",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "gatewayusr",
        label: "网关用户名",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "gatewaypsw",
        label: "网关密码",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "description",
        label: "备注说明",
        type: "string",
      }
    ],
    subTable: [{
      path: "deviceGateway_instructions",
      button: "配置网关指令"
    }]
	},
	deviceGateway_instructions: {
		column : [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
      },
      {
        key: "gatewayid",
        label: "网关ID",
        type: "number",
        isEdit: false,
      },
      {
        key: "num",
        label: "指令编号Data+i",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "deviceid",
        label: "设备ID",
        type: "select",
        required: true,
        errorMessage: "必填",
      },
      {
        key: "typedevicename",
        label: "设备类型（电表）",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "instruction",
        label: "指令",
        type: "string",
        required: true,
        errorMessage: "必填"
      }
    ]
	},
	//企业配置
	customer: {
		column: [
  		{
        key: "id",
  			label: "ID",
  			type: "number",
  			isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
  		},
  		{
        key: "shortname",
  			label: "名称简写",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
        key: "company",
  			label: "公司名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
        key: "companycode",
  			label: "组织机构代码",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
      key: "address",
			label: "地址",
			type: "string",
  		},
      {
        key: "location",
        label: "经纬度",
        type: "string",
      },
      {
        key: "pic",
        label: "照片",
        type: "image"
      },
      {
        key: "bizownername",
        label: "业务负责人姓名",
        type: "string",
        isDetail: true
      },
      {
        key: "bizownertel",
        label: "业务负责人办公电话",
        type: "string",
        isDetail: true
      },
      {
        key: "bizownerphone",
        label: "业务负责人移动电话",
        type: "number",
        errorMessage: "电话格式错误",
        isDetail: true
      },
      {
        key: "taxpayeridentification",
        label: "开票信息",
        type: "string",
        isDetail: true
      },
      {
        key: "bank",
        label: "开户行",
        type: "string",
        isDetail: true
      },
      {
        key: "bankaccount",
        label: "银行账户",
        type: "string",
        isDetail: true
      },
      {
        key: "financechiefname",
        label: "财务负责人姓名",
        type: "string",
        isDetail: true
      },
      {
        key: "financechieftel",
        label: "财务负责人办公电话",
        type: "string",
        isDetail: true
      },
      {
        key: "financechiefphone",
        label: "财务负责人移动电话",
        type: "number",
        isDetail: true,
        errorMessage: "电话格式错误"
      },
      {
        key: "companytypecode",
        label: "企业类型代码",
        type: "select",
        options: [
          {label:"工业",value:"01"},
          {label:"商业",value:"02"},
          {label:"农业",value:"03"}
        ],
        isDetail: true
      },
      {
        key: "dataauthorityid",
        label: "数据权限ID",
        type: "string",
        isDetail: true
      },
      {
        key: "isspecialpower",
        label: "是否特殊用电企业",
        type: "string",
        isDetail: true
      },
      {
        key: "superiorunitcode",
        label: "上级单位代码",
        type: "string",
        isDetail: true
      },
      {
        key: "endtime",
        label: "用户有效期",
        type: "date",
        isDetail: true
      },
  	],
    subTable: [
      {
        path:"electricitySubstation",  //变电所id=0，表示展示所有变电所
        button: "管理变电所"
      }
    ]
	},
	electricitySubstation: {
		column: [
  		{
        key: "id",
  			label: "ID",
  			type: "number",
  			isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
  		},
  		{
        key: "substationname",
  			label: "变电所名称",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
        key: "companyid",
  			label: "所属企业ID",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
      key: "address",
			label: "地址",
			type: "string",
  		},
      {
        key: "type",
        label: "变电所类型",
        type: "select",
        options:[
          {label:"箱变", value:"箱变"},
          {label:"变电所", value:"变电所"},
        ]
      },
      {
        key: "lacation",
        label: "地图位置",
        type: "string",
      },
      {
        key: "powertype",
        label: "电压状态",
        type: "select",
        options:[
          {label:"单电源", value:"0"},
          {label:"双电源", value:"1"},
        ]
      },
      {
        key: "voltageclass",
        label: "电压等级",
        type: "select",
        options:[
          {label:"220V", value:"0"},
          {label:"380V", value:"1"},
          {label:"10kv", value:"2"},
        ]
      },
      {
        key: "diagram",
        label: "系统图",
        type: "svg",
        isDetail: true
      },
      {
        key: "total",
        label: "总容量",
        type: "string",
        isDetail: true
      },
      {
        key: "constructionunit",
        label: "承建单位",
        type: "string",
        isDetail: true
      },
      {
        key: "constructiontime",
        label: "建设时间",
        type: "string",
        isDetail: true
      },
      {
        key: "involtage",
        label: "入所侧电压",
        type: "string",
        isDetail: true
      },
      {
        key: "outvoltage",
        label: "出所侧电压",
        type: "string",
        isDetail: true
      }
  	],
    subTable: [
      {
        // title: "图纸",
        path: "electricitySubstation_pic",
        button: "配置图纸",
        plain: true
      },
      {
        // title: "视频",
        path: "electricitySubstation_video",
        button: "配置视频",
        plain: true
      },
      {
        path:"electricitySubstation_cabinets",
        button: "管理机柜"
      }
    ]
	},
	electricitySubstation_pic: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        mainKey: true,   //主键！！！
      },
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "number",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "num",
        label: "图纸编号",
        type: "number",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "pic",
        label: "图纸图片",
        type: "image",
        required: true,
        errorMessage: "必填"
      }
    ]
	},
	electricitySubstation_video: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        mainKey: true,   //主键！！！
      },
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "number",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "num",
        label: "视频编号",
        type: "number",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "url",
        label: "视频URL",
        type: "string",
        required: true,
        errorMessage: "必填"
      }
    ]
	},
	electricitySubstation_incoming: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！
      },
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "number",
        isEdit: false
      },
      {
        key: "num",
        label: "所内编号",
        type: "number",
        isEdit: false
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "transformerid",
        label: "变压器ID",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "status",
        label: "状态",
        default: "0",
        type: "select",
        options: [
          {value: "0", label: "正常"},
          {value: "1", label: "停用"}
        ]
      },
      {
        key: "connectiontype",
        label: "连接类型",
        type: "select",
        required: true,
        errorMessage: "必填",
        options: [
          {value: "0", label: "母连"},
          {value: "1", label: "独体"}
        ]
      },
      {
        key: "transformer_manufacturer",
        label: "变压器生产企业",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "manufacturercode",
        label: "生产编号",
        type: "number",
        isDetail: true
      },
      {
        key: "transformermodel",
        label: "型号",
        type: "number",
        isDetail: true
      },
      {
        key: "weight",
        label: "重量",
        type: "number",
        isDetail: true
      },
      {
        key: "workenviorment",
        label: "使用条件",
        type: "select",
        isDetail: true,
        options: [
          {value: "户内式", label: "户内式"},
          {value: "户外式", label: "户外式"}
        ]
      },
      {
        key: "worktype",
        label: "种类",
        type: "select",
        isDetail: true,
        options: [
          {value: "干式", label: "干式"},
          {value: "油浸", label: "油浸"}
        ]
      },
      {
        key: "ratedvoltage",
        label: "额定电压",
        type: "string",
        isDetail: true
      },
      {
        key: "ratedfrequency",
        label: "额定频率",
        type: "string",
        isDetail: true
      },
      {
        key: "connectiongrouplabel",
        label: "连接组标号",
        type: "select",
        isDetail: true,
        options: [
          {value: "Dyn11", label: "Dyn11"},
          {value: "Yyn0", label: "Yyn0"}
        ]
      },
      {
        key: "insulationclass",
        label: "绝缘耐热等级",
        default: "0",
        type: "select",
        default: "0",
        isDetail: true,
        options: [
          {value: "A"},
          {value: "E"},
          {value: "B"},
          {value: "F"},
          {value: "H"},
          {value: "C"},
          {value: "N"},
          {value: "R"}
        ]
      },
      {
        key: "manufacturdate",
        label: "生产日期",
        type: "date",
        isDetail: true
      }
    ],
    subTable: [{
      path: "deviceElecMeter?cabinettype=0",  //进线柜下的电表
      button: "配置电表"
    }]
	},
	deviceTransformer_connection: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！
      },
      {
        key: "transformerID_A",
        label: "变压器A",
        type: "select"
      },
      {
        key: "transformerID_B",
        label: "变压器B",
        type: "select"
      }
    ]
	},
	electricitySubstation_capacitor: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！
      },
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "number",
        isEdit: false
      },
      {
        key: "num",
        label: "所内编号",
        type: "number",
        isEdit: false
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string"
      },
      {
        key: "status",
        label: "状态",
        type: "select",
        default: "0",
        options: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "停用"
          }
        ]
      }
    ],
    subTable: [{
      path: "deviceElecMeter?cabinettype=1",  //电容柜下的电表
      button: "配置电表"
    }]
	},
	electricitySubstation_low: {
		column: [
      {
        key: "id",
        label: "馈电柜ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！
      },
      {
        key: "electricitysubstationid",
        label: "变电所ID",
        type: "number",
        isEdit: false
      },
      {
        key: "num",
        label: "所内编号",
        type: "number",
        isEdit: false
      },
      {
        key: "lowcabinettype",
        label: "馈电柜类型",
        type: "select",
        default: "进线柜",
        options: [
          {value: "进线柜"},
          {value: "电容器柜"},
          {value: "馈线柜"},
          {value: "联络柜" }
        ]
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "lowcabinetmodel",
        label: "型号",
        type: "select",
        default: "GGD",
        options: [
          {value: "GGD"},
          {value: "GCK"},
          {value: "GCS"},
          {value: "MNS" }
        ]
      },
      {
        key: "pic",
        label: "照片",
        type: "image",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "manufacturdate",
        label: "生产日期",
        type: "date",
        isDetail: true
      },
      {
        key: "incablemodel",
        label: "进线电缆型号",
        type: "string",
        isDetail: true
      },
      {
        key: "outcablemodel",
        label: "馈出电缆型号",
        type: "string",
        isDetail: true
      },
      {
        key: "mainbusmodel",
        label: "主母排型号",
        type: "string",
        isDetail: true
      },
      {
        key: "nlinemodel",
        label: "N线型号",
        type: "string",
        isDetail: true
      },
      {
        key: "pelinemodel",
        label: "PE线型号",
        type: "string",
        isDetail: true
      },
      {
        key: "status",
        label: "状态",
        type: "select",
        default: "0",
        options: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "停用"
          }
        ]
      }
    ],
    subTable: [{
      path: "deviceElecMeter?cabinettype=2",  //馈电柜下的电表
      button: "配置电表"
    }]
	},
	deviceElecMeter: {
		column: [
      {
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！
      },
      {
        key: "cabinetid",
        label: "电表所在柜ID",
        type: "number",
        isEdit: false,
      },
      {
        key: "cabinettype",
        label: "柜类型",
        type: "select",
        isEdit: false,
        default: 0,
        options: [
          {value: 0, label: "进线柜"},
          {value: 1, label: "电容柜"},
          {value: 2, label: "馈电柜"},
        ]
      },
      {
        key: "manufacturer",
        label: "生产企业",
        type: "string"
      },
      {
        key: "manufacturercode",
        label: "生产编号",
        type: "string"
      },
      {
        key: "manufacturdate",
        label: "生产日期",
        type: "date"
      },
      {
        key: "gatewaycode",
        label: "网关码（网关内部需要，业务编号，数据传输使用）",
        type: "number",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "typedeviceid",
        label: "设备解析类型",
        type: "select",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "num",
        label: "回路编号",
        type: "number",
        isEdit: false
      },
      {
        key: "circuitname",
        label: "回路名称",
        type: "string",
        required: true,
        errorMessage: "必填"
      },
      {
        key: "circuittype",
        label: "回路类型",
        type: "select",
        default: "总表",
        options: [
          {value: "总表", label: "总表"},
          {value: "其它", label: "其它"},
        ]
      },
      // gatewayID
    ]
	},
	//电工配置
	electrician: {
		column: [
  		{
  			key: "id",
  			label: "ID",
  			type: "number",
  			isEdit: false,
  			mainKey: true,   //主键！！！ 用于删除
  		},
  		{
  			key: "name",
  			label: "姓名",
  			type: "string",
  			required: true,
  			errorMessage: "必填"
  		},
  		{
  			key: "companyid",
  			label: "所属企业",
  			type: "number",
  			required: true,
  			errorMessage: "必填"
  		},
      {
          key: "address",
          label: "住址",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "tel",
          label: "办公电话",
          type: "string",
          required: true,
          errorMessage: "必填",
      },
      {
          key: "phone",
          label: "手机号码",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "positionaltitle",
          label: "职称",
          type: "string",
          required: true,
          errorMessage: "必填"
      },

      {
          key: "ectype",
          label: "作业类别(电工证)",
          type: "string",
          required: true,
          errorMessage: "必填"
      },
      {
          key: "sccompanyname",
          label: "企业名称（安全证）",
          type: "string",
          required: true,
          errorMessage: "必填"
      },
      {
          key: "scduty",
          label: "职务（安全证）主要负责人",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "sctechnicaltitle",
          label: "技术职称（安全证）",
          type: "string",
          required: true,
          errorMessage: "必填"
      },
      {
          key: "status",
          label: "状态",
          type: "select",
          default: "0",
          options: [
            {
                value: "0",
                label: "正常"
            },
            {
                value: "1",
                label: "停用"
            }
          ]
      },
      {
          key: "identitycard",
          label: "身份证号码",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "pic",
          label: "照片",
          type: "image",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
       {
          key: "ecnum",
          label: "电工证编号",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "ecgranttime",
          label: "授予时间(电工证)",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "eclicensenum",
          label: "许可证编号(电工证)",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "ecpic",
          label: "证件照片(电工证)",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "scnum",
          label: "安全证编号",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "scissuedate",
          label: "发证日期（安全证）",
          type: "date",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "scdatestart",
          label: "有效日期起（安全证）",
          type: "date",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "scdateend",
          label: "有效期止（安全证）",
          type: "date",
          required: true,
          errorMessage: "必填",
          isDetail: true
      },
      {
          key: "scpic",
          label: "证件照片（安全证）",
          type: "string",
          required: true,
          errorMessage: "必填",
          isDetail: true
      }
  	],
    subTable: [
      {
        path: "electrician_pic",
        button: "添加证件",
        plain: true
      },
      {
        path: "magDomain_electrician",
        button: "配置管理域"
      }
    ]
	},
	electrician_pic: {
		column: [
  		{
        key: "id",
        label: "ID",
        type: "number",
        isEdit: false,
        mainKey: true,   //主键！！！ 用于删除
      },
      {
  			key: "electricianid",
  			label: "电工ID",
  			type: "number",
        isEdit: false,
  		},
      {
        key: "type",
        label: "证件类型",
        type: "select",
        required: true,
        default: "电工证",
        options: [
          {
            value: "电工证",
            label: "电工证"
          },
          {
            value: "安全证",
            label: "安全证"
          }
        ]
      },
      {
        key: "num",
        label: "系统内证件编号",
        type: "number",
        isEdit: false,
      },
      {
        key: "pic",
        label: "证件照片",
        type: "image",
      },

  	]
	},
	magDomain_electrician: {
		column: [
			{
				key: "id",
				label: "ID",
				type: "number",
				isEdit: false,
				mainKey: true,   //主键！！！ 用于删除
			},
			{
				key: "electricianid",
				label: "电工ID",
				type: "number",
				isEdit: false
			},
			{
				key: "magdomainid",
				label: "管理域ID",
				type: "select",
				required: true,
				errorMessage: "必填"
			},
			{
				key: "post",
				label: "位置",
				type: "string",
				required: false,
				errorMessage: "必填"
			},
			{
				key: "status",
				label: "状态",
				type: "select",
				default: "0",
				options: [
					{
						value: "0",
						label: "正常"
					},
					{
						value: "1",
						label: "停用"
					}
				]
			},
			{
				key: "description",
				label: "备注说明",
				type: "string",
			}
		]
	},
}