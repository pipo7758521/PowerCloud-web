<template>
	  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
  	</div>

  	<el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%">
      <el-table-column v-for="item in column" align="center" :label="item.label" >
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 编辑框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="formRules" ref="dataForm" :model="temp" label-position="left" label-width="20%" style='margin-left:50px;margin-right:50px;'>
      	<el-form-item v-for="item in column" v-if="!item.hidden"
      		:label="item.label"
      		:prop="item.key">
      		<el-input v-model="temp[item.key]"></el-input>
      	</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

 	</div>
</template>


<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { fetchList, insertData, updateData, deleteData } from '@/api/typeDevice'


export default {
  name: 'table',
  directives: {
    waves
  },
  created() {
    this.getList()
    this.resetTemp()

    //生成 表单校验规则
    this.formRules = {};
    this.column.forEach( (o,i) => {
    	this.formRules[o.key] = [{
    		required: o.required,
    		trigger: o.type == "select" ? "change" : "blur",
    		message: o.errorMessage
    	}]
    })
    console.log(this.formRules)
  },
  data() {
    return {
    	column: [
    		{
    			key: "typeDeviceID",
    			label: "ID",
    			type: "number",
    			hidden: true,
    			mainKey: true,   //主键！！！ 用于删除
    		},
    		{
    			key: "typeDeviceName",
    			label: "设备名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "functionName",
    			label: "解析函数名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "className",
    			label: "解析类名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "description",
    			label: "备注说明",
    			type: "text",
    		}
    	],
    	temp: null,  //每一项数据的tmp
    	list: null,
    	tableKey: 0,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      formRules: null,
    }
  },
  methods: {
  	getList() {
  		this.listLoading = true
	    fetchList(this.listQuery).then(response => {
	      this.list = response.data.items
	      this.total = response.data.total
	      this.listLoading = false
	    })
  	},
  	//清空 tmp数据
  	resetTemp() {
			this.temp = {}
	    this.column.forEach( (o,i) => {
	    	this.temp[o.key] = o.default || "";
	    })
	    console.log(this.temp)
  	},
  	//点击 添加
  	handleAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //点击 编辑
    handleUpdate(row) {
  		this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
  	},
  	//点击 删除
  	handleDelete(row) {
  		let param = null;
  		this.column.forEach( (o,i) => {
  			if(o.mainKey && row[o.key]) {
  				param = {};
  				param[o.key] = row[o.key]
  				return
  			}
  		})
  		deleteData(param).then(() => {
  			this.$notify({
	        title: '成功',
	        message: '删除成功',
	        type: 'success',
	        duration: 2000
	      })
	      const index = this.list.indexOf(row)
      	this.list.splice(index, 1)
	      // this.getList();
  		})
    },
  	//新增数据
    addData() {
    	this.$refs['dataForm'].validate((valid) => {
        if (valid) {
        	insertData(this.temp).then( () => {
        		this.dialogFormVisible = false;
        		this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList();
        	})
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
            /*for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }*/
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
  	handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
  }

}
</script>