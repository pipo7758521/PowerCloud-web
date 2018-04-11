<template>
  <!-- <div> -->
    <!-- <p>当前管理域</p> -->
    <cms-grid
    :isSubTable = "true"
    :column = "column"
    :fetchList = "fetchList"
    :insertData = "insertData"
    :updateData = "updateData"
    :deleteData = "deleteData"
  >
  </cms-grid>
  <!-- </div> -->

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
        options.push({value: o.id})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "electricitysubstationid") {
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
    	],
      fetchList: fetchList,
      insertData: insertData,
      updateData: updateData,
      deleteData: deleteData,
		}
	}
}

</script>