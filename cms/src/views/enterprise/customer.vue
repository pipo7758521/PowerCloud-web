<template>
	<cms-grid
    :moduleName = "moduleName"
		:column = "column"
    :subTable = "subTable"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
		return {
      moduleName: "customer",
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
          key: "bizownername",
          label: "业务负责人姓名",
          type: "string",
        },
        {
          key: "bizownertel",
          label: "业务负责人办公电话",
          type: "string",
        },
        {
          key: "bizownerphone",
          label: "业务负责人移动电话",
          type: "number",
          errorMessage: "电话格式错误"
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
        {
          key: "pic",
          label: "照片",
          type: "image",
          isDetail: true
        },
    	],
      subTable: [
        {
          path:"electricitySubstation",  //变电所id=0，表示展示所有变电所
          button: "管理变电所"
        }
      ]
		}
	}
}

</script>