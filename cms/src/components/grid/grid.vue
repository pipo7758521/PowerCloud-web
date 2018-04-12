<template>
	  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button v-if="isSubTable" class="filter-item" style="margin-left: 10px;" @click="handleBack" type="primary" plain icon="el-icon-back">返回上一级</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
  	</div>

    <!-- 表格 -->
  	<el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%">

      <!-- 详情展开 -->
      <el-table-column v-if="detailColumn.length" type="expand">
        <template  slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item  v-for="item in detailColumn" :label="item.label" >
              <span v-if="item.type == 'image'"><img width="60" :src="props.row[item.key]"/></span>
              <span v-else>{{ props.row[item.key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>


      <el-table-column v-if="!item.isDetail" v-for="item in listColumn" align="center" :label="item.label"
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
          <span v-else-if="item.type == 'image'"><img  :src="scope.row[item.key]"/></span>
        </template>
      </el-table-column>

     <el-table-column v-if="subTable.length" v-for="sub in subTable" align="center" label="详情" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary" @click="handleSubTable(sub, scope.row)">{{sub.button}}
          </el-button>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="150px">
        <template slot-scope="scope" >
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button> -->
          <el-button type="primary" plain icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
           <el-button type="danger" plain icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>

          <!-- <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除 -->
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
      		<el-input v-if="item.type == 'text'" v-model="temp[item.key]"></el-input>
          <!-- 数字 -->
          <el-input v-if="item.type == 'number'" v-model.number="temp[item.key]"></el-input>
          <!-- 下拉选择框 -->
          <el-select v-else-if="item.type =='select'" class="filter-item" v-model="temp[item.key]" placeholder="请选择">
            <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" >
            </el-option>
          </el-select>
          <!-- date日期选择 -->
          <el-date-picker v-if="item.type == 'date'"v-model="temp[item.key]" type="date" placeholder="选择日期"></el-date-picker>

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
    isSubTable: {  //当前表格是否是子表
      type: Boolean,
      default: function () {
        return false
      }
    },
    column: {   //当前表格的 每个列 的字段属性
      type: Array,
      default: function () {
        return []
      }
    },
    subTable: {  //当前表格是否含有子表
      type: Array,
      default: function () {
        return []
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
    		message: o.errorMessage,
        type: o.type
    	}]
      if(o.isDetail) {
        this.detailColumn.push(o)
      }
      else {
        this.listColumn.push(o)
      }
    })
    console.log(this.formRules)
  },
  data() {
    return {
      listColumn: [],   //表格中展示的列
      detailColumn: [], //点击展开，展示的详细信息，对应column中，isDetail:true的列
    	temp: null,       //每一行数据的tmp，用于添加、编辑等传递参数
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
    handleSubTable(sub, row) {
      console.log(row)
      console.log(this.$route.path)
      this.$router.push({path: `${this.$route.path}/${row.id}/${sub.path}`})
    },
    handleBack() {
      var arr = this.$route.path.split("/")
      let path = arr.slice(0,arr.length-2).join("/")
      this.$router.push({path: path})
    }
  }

}
</script>

<style lang="scss">
  .table-expand {
    font-size: 0;

    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    label.el-form-item__label {
      width: 150px;
      color: #99a9bf;
    }
  }
</style>