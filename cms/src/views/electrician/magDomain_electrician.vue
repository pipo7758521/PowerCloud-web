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
import tableConfig from "@/views/_config/table"
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

		})
	},
	data () {
		return {
			moduleName: "magDomain_electrician",
			column: tableConfig["magDomain_electrician"].column,
		}
	}
}

</script>