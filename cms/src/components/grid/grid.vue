<template>
	  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button v-if="isSubTable" class="filter-item" style="margin-left: 10px;" @click="handleBack" type="primary" plain icon="el-icon-back">返回上一级</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
  	</div>

    <!-- 表格 -->
  	<el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%">
      <el-table-column v-if="item.isVisible !== false" v-for="item in column" align="center" :label="item.label"
        :width= "(item.mainKey||item.key == 'status') ? '80px' : ''">
        <template slot-scope="scope">
          <!-- 文本 -->
          <span v-if="item.type == 'text'|| item.type == 'number'">
            {{scope.row[item.key]}}
          </span>
          <!-- 选项 -->
          <el-tag v-else-if="item.key == 'status'" :type="scope.row[item.key] | statusFilter">{{scope.row.status == "0" ? "正常" : "停用"}}</el-tag>
          <span v-else-if="item.type == 'date'">{{scope.row[item.key]}}</span>
          <span v-else-if="item.type == 'select'">{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="subTable" align="center" label="详情" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary" plain @click="handleSubTable(scope.row)">{{subTable.button}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="150px">
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

      <!-- 子表 -->
      <!-- <el-table-column v-if="subTable" type="expand">
        <template slot-scope="props">
          <slot></slot>
        </template>
      </el-table-column> -->

    </el-table>



    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 编辑框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="formRules" ref="dataForm" :model="temp" label-position="left" label-width="30%" style='margin-left:50px;margin-right:50px;'>
      	<el-form-item v-for="item in column" v-if="item.isEdit !== false"
      		:label="item.label"
      		:prop="item.key">
          <!-- 文本 -->
      		<el-input v-if="item.type == 'text'||item.type == 'number'" v-model="temp[item.key]"></el-input>
          <!-- 下拉选择框 -->
          <el-select v-else-if="item.type =='select'" class="filter-item" v-model="temp[item.key]" placeholder="请选择">
            <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" >
            </el-option>
          </el-select>

      	</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
        <el-button v-else type="primary" @click="editData">确定</el-button>
      </div>
    </el-dialog>

 	</div>
</template>


<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
// import { fetchList, insertData, editData, deleteData } from '@/api/typeDevice'
import request from '@/utils/request'

export default {
  name: 'table',
  directives: {
    waves
  },
  props: {
    isSubTable: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    column: {
      type: Array,
      default: function () {
        return []
      }
    },
    subTable: {
      type: Object,
      default: function () {
        return null
      }
    },
    fetchList: {
      type: Function,
      default: function () {
      }
    },
    insertData: {
      type: Function,
      default: function () {
      }
    },
    updateData: {
      type: Function,
      default: function () {
      }
    },
    deleteData: {
      type: Function,
      default: function () {
      }
    },
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'warning',
        2: 'danger'
      }
      return statusMap[status]
    }/*,
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }*/
  },
  methods: {
  	getList() {
  		this.listLoading = true
      //如果是子表，则要根据父表的ID查找对应的子表
      let parentId = null
      if(this.isSubTable) {
        let arr = this.$route.path.split("/")
        parentId = arr[arr.length-2]
      }
	    this.fetchList(parentId).then(response => {
	      this.list = response.data.items
	      this.total = response.data.total
	      this.listLoading = false
	    })
  	},
  	//清空 tmp数据
  	resetTemp() {
			this.temp = {}
	    this.column.forEach( (o,i) => {
        //太恶心了 双向绑定的，要这么赋值
        this.$set(this.temp, o.key, o.default || "")
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
console.log("temp===")
      console.log(this.temp)
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
  		this.deleteData(param).then(() => {
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
        	this.insertData(this.temp).then( () => {
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
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          this.updateData(tempData).then( () => {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.getList();
          })
            /*for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }*/
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
    handleSubTable(row) {
      console.log(row)
      console.log(this.$route.path)
      this.$router.push({path: `${this.$route.path}/${row.id}/${this.subTable.path}`})
    },
    handleBack() {
      var arr = this.$route.path.split("/")
      let path = arr.slice(0,arr.length-2).join("/")
      this.$router.push({path: path})
    }
  }

}
</script>