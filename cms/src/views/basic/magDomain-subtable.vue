<template>
	<cms-grid
    :column = "column"
    :subTable = "subTable"
    :fetchList = "fetchList"
    :insertData = "insertData"
    :updateData = "updateData"
    :deleteData = "deleteData"
  >
    <cms-grid
      :isSubTable = "true"
      :column = "childColumn"
      :fetchList = "childFetchList"
      :insertData = "childInsertData"
      :updateData = "childUpdateData"
      :deleteData = "childDeleteData"
    >
    </cms-grid>
  </cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import { fetchList, insertData, updateData, deleteData } from '@/api/magDomain'
import * as child from '@/api/magDomain_electricitySubstation'
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

      this.childColumn.forEach( (o,i) => {
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
    			key: "magdomain",
    			label: "管理域名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "createrid",
    			label: "创建人",
    			type: "text",
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
      subTable: {
        path: "magDomain_electricitySubstation",
        button: "查看变电所"
      },
      fetchList: fetchList,
      insertData: insertData,
      updateData: updateData,
      deleteData: deleteData,
      childColumn: [
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
          isVisible: false,
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
      childFetchList: child.fetchList,
      childInsertData: child.insertData,
      childUpdateData: child.updateData,
      childDeleteData: child.deleteData,
		}
	}
}

</script>