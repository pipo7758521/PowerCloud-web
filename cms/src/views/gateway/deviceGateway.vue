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

import { fetchList, insertData, updateData, deleteData } from '@/api/deviceGateway'
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
      column : [
        {
          key: "gatewayID",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
        },
        {
          key: "gatewayName",
          label: "网关名称",
          type: "text",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "text",
          // required: true,
          errorMessage: "必填"
        },
        {
          key: "mac",
          label: "MAC地址",
          type: "text",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "subjectID",
          label: "订阅主题ID",
          type: "number",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "electricitySubstationID",
          label: "安装变电所ID",
          type: "select",
          required: true,
          errorMessage: "必填",
        },
        {
          key: "gatewayUSR",
          label: "网关用户名",
          type: "text",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "gatewayPSW",
          label: "网关密码",
          type: "text",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "description",
          label: "备注说明",
          type: "text",
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