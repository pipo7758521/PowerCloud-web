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

// import { fetchList, insertData, updateData, deleteData } from '@/api/electrician'

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
		return {
            moduleName: "electrician",
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
            },

            /*{
                key: "description",
                label: "备注说明",
                type: "string",
            }*/
    	],
      subTable: [
          {
              path: "electrician_pic",
              button: "查看照片",
              plain: true
          },
          {
              path: "magDomain_electrician",
              button: "配置管理域"
          }
      ],
		}
	}
}

</script>

