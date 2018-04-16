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

export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
	data () {
		return {
      moduleName: "electricitySubstation_video",
			column: [
        {
          key: "id",
          label: "ID",
          type: "number",
          mainKey: true,   //主键！！！
        },
        {
          key: "electricitysubstationid",
          label: "变电所ID",
          type: "number",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "num",
          label: "视频编号",
          type: "number",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "url",
          label: "视频URL",
          type: "string",
          required: true,
          errorMessage: "必填"
        }
      ]
		}
	}
}

</script>