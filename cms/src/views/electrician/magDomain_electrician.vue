<template>
	<cms-grid
		:moduleName = "moduleName"
		:isSubTable = "true"
		:column="column"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
// import { fetchList, insertData, updateData, deleteData } from '@/api/magDomain_electrician'
import { magDomainIDList, electricianIDList} from '@/api/common'

export default {
	components: {
		"cms-grid": Grid
	},
	created () {
		//与 管理域ID 相关联
		magDomainIDList().then( response => {
			let list = response.data.items;
			let options = [];
			list.forEach( (o,i) => {
				options.push({value: o.id})
			})

			this.column.forEach( (o,i) => {
			 if(o.key == "magdomainid") {
					o.options = options;
				}
			})

		}),

    //与 电工ID 相关联
    electricianIDList().then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id})
      })
      
      this.column.forEach( (o,i) => {
       if(o.key == "electricianid") {
          o.options = options;
        }
      })

    })
	},
	data () {
		return {
			moduleName: "magDomain_electrician",
			column: [
				{
					key: "id",
					label: "ID",
					type: "number",
					isEdit: false,
					mainKey: true,   //主键！！！ 用于删除
				},
				{
					key: "electricianid",
					label: "电工ID",
					type: "select",
					required: true,
					errorMessage: "必填"
				},
				{
					key: "magdomainid",
					label: "管理域ID",
					type: "select",
					required: true,
					errorMessage: "必填"
				},
				{
					key: "post",
					label: "位置",
					type: "string",
					required: false,
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
					key: "description",
					label: "备注说明",
					type: "string",
				}
			]
		}
	}
}

</script>