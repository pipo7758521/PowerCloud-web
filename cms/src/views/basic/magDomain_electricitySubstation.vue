<template>
	<cms-grid
    :column="column"
    :fetchList = "fetchList"
    :insertData = "insertData"
    :updateData = "updateData"
    :deleteData = "deleteData"
  >
  </cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import { fetchList, insertData, updateData, deleteData } from '@/api/magDomain_electricitySubstation'
import { stationIDList } from '@/api/common'

export default {
	components: {
		"cms-grid": Grid
  },
  created () {
    //与 变电所ID 相关联
    stationIDList().then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.electricitySubstationID})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "electricitySubstationID") {
          o.options = options;
        }
      })

    })
  },
	data () {
		return {
			column: [
    		{
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
        },
        {
    			key: "magDomainID",
    			label: "管理域ID",
    			type: "number",
          isEdit: false,
          isVisible: false,
    			required: true,
          errorMessage: "必填"
    		},
        {
          key: "electricitySubstationID",
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
    	],
      fetchList: fetchList,
      insertData: insertData,
      updateData: updateData,
      deleteData: deleteData,
		}
	}
}

</script>