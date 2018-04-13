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
      moduleName: "magDomain",
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
		}
	}
}

</script>