<template>
    <cms-grid
      :moduleName = "moduleName"
      :isSubTable = "true"
      :column = "column"
    >
  </cms-grid>

</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
// import { fetchList, insertData, updateData, deleteData } from '@/api/electrician_pic'
import { stationIDList } from '@/api/common'

export default {
	components: {
		"cms-grid": Grid
  },
	data () {
		return {
      moduleName: "electrician_pic",
			column: [
    		{
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
        },
        {
    			key: "electricianID",
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
		}
	}
}

</script>