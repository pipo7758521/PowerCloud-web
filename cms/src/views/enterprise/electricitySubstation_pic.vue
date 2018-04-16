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
      moduleName: "electricitySubstation_pic",
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
          label: "图纸编号",
          type: "number",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "pic",
          label: "图纸图片",
          type: "image",
          required: true,
          errorMessage: "必填"
        }
      ]
		}
	}
}

</script>