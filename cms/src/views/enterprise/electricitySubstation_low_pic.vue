<template>
  <cms-step-wrapper :activeIndex="3">
  	<cms-grid
      :moduleName = "moduleName"
  		:column = "column"
      :isSubTable = "true"
      :connectModule = "connectModule"
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
      moduleName: "electricitySubstation_low_pic",
			column: tableConfig["electricitySubstation_low_pic"].column,
      //与 设备类型 相关联
      connectModule: [{
        moduleName: "electricitySubstation_low",  //相关联的模块名
        myKey: "lowcabinetid",         //本模块中关联的数据库字段
        connectKey: "id",           //关联的模块中的对应数据库字段
        displayKey: "id",         //显示在前端的字段
      }]
		}
	}
}

</script>