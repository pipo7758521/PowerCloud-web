<template>
  <cms-step-wrapper :activeIndex="1">
    <cms-grid
      :moduleName = "moduleName"
      :column = "column"
      :subTable = "subTable"
    >
    </cms-grid>
  </cms-step-wrapper>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import StepWrapper from "./components/stepWrapper"
import tableConfig from "@/views/_config/table"

export default {
	components: {
		"cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
	},
	data () {
		return {
      moduleName: "customer",
			column: tableConfig["customer"].column,
      subTable: tableConfig["customer"].subTable
		}
	}
}

</script>