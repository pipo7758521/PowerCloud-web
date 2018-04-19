<template>
  <cms-step-wrapper :activeIndex="2">
    <cms-grid
      :moduleName = "moduleName"
      :column = "column"
      :subTable = "subTable"
      :isSubTable = "true"
    >
    </cms-grid>
  </cms-step-wrapper>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import StepWrapper from "./components/stepWrapper"
import tableConfig from "@/views/_config/table"

import { fetchList } from '@/api/api'

export default {
	components: {
		"cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
	},
  created () {
    //与 管理域ID 相关联
    fetchList("customer").then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id, label: o.company})
      })

      this.column.forEach( (o,i) => {
       if(o.key == "companyid") {
          o.options = options;
          this.$set(this.column, i, o)
        }
      })

    })
  },
	data () {
		return {
      moduleName: "electricitySubstation",
			column: tableConfig["electricitySubstation"].column,
      subTable: tableConfig["electricitySubstation"].subTable
		}
	}
}

</script>