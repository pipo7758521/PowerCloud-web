<template>
	<cms-grid
    :isSubTable = "true"
		:column = "column"
		:fetchList = "fetchList"
		:insertData = "insertData"
		:updateData = "updateData"
		:deleteData = "deleteData"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"

import { fetchList, insertData, updateData, deleteData } from '@/api/deviceGateway_instructions.js'
import { deviceElecMeterList } from '@/api/common'
export default {
	components: {
		"cms-grid": Grid
	},
  created () {
    //与 变电所ID 相关联
    deviceElecMeterList().then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "deviceid") {
          o.options = options;
        }
      })

    })
  },
	data () {
    return {
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
          type: "text",
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
          type: "text",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "instruction",
          label: "指令",
          type: "text",
          required: true,
          errorMessage: "必填"
        }
      ],
      fetchList:  fetchList,
      insertData: insertData,
      updateData: updateData,
      deleteData: deleteData,
    }

	}
}

</script>