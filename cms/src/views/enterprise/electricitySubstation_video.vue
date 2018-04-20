<template>
  <cms-step-wrapper :activeIndex="2">
    <cms-grid
      :moduleName = "moduleName"
      :column = "column"
      :isSubTable = "true"
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
      moduleName: "electricitySubstation_video",
      column: tableConfig["electricitySubstation_video"].column,
		}
	}
}

</script>