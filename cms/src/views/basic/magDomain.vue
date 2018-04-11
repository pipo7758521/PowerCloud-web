<template>
	<cms-grid
    :column = "column"
    :subTable = "subTable"
    :fetchList = "fetchList"
    :insertData = "insertData"
    :updateData = "updateData"
    :deleteData = "deleteData"
  >
  </cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import { fetchList, insertData, updateData, deleteData } from '@/api/magDomain'

export default {
	components: {
		"cms-grid": Grid
  },
	data () {
		return {
			column: [
    		{
    			key: "magDomainID",
    			label: "ID",
    			type: "number",
    			isEdit: false,
    			mainKey: true,   //主键！！！ 用于删除
    		},
    		{
    			key: "magDomain",
    			label: "管理域名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "createrID",
    			label: "创建人",
    			type: "text",
    			isEdit: false,
    		},
    		{
    			key: "CreateTime",
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
      subTable: {
        path: "magDomain_electricitySubstation",
        button: "查看变电所"
      },
      fetchList: fetchList,
      insertData: insertData,
      updateData: updateData,
      deleteData: deleteData,
		}
	}
}

</script>