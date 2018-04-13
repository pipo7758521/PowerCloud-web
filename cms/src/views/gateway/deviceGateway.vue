<template>
	<cms-grid
    :moduleName = "moduleName"
		:column = "column"
    :subTable = "subTable"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import { stationIDList } from '@/api/common'
export default {
	components: {
		"cms-grid": Grid
	},
	data () {
    return {
      moduleName: "deviceGateway",
      column : [
        {
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
        },
        {
          key: "gatewayname",
          label: "网关名称",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string",
          // required: true,
          // errorMessage: "必填"
        },
        {
          key: "mac",
          label: "MAC地址",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "subjectid",
          label: "订阅主题ID",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "gatewayusr",
          label: "网关用户名",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "gatewaypsw",
          label: "网关密码",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "description",
          label: "备注说明",
          type: "string",
        }
      ],
      subTable: [{
        path: "deviceGateway_instructions",
        button: "配置网关指令"
      }]
    }

	}
}

</script>