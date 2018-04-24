<template>
	  <div class="app-container calendar-list-container">
    <div class="filter-container" v-if="!treeRoute.path">
      <el-button v-if="isSubTable" class="filter-item" style="margin-left: 10px;" @click="handleBack" type="primary" plain icon="el-icon-back">返回上一级</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="primary" icon="el-icon-edit-outline">{{$t('table.add')}}</el-button>
  	</div>

    <!-- 表格 -->
  	<el-table v-if="isRender" :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%" :default-expand-all="treeRoute.path ? true : false">

      <!-- 详情展开 -->
      <el-table-column v-if="detailColumn.length" type="expand">
        <template  slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item  v-for="item in detailColumn" :label="item.label" :key="item.key" >
              <!-- 图片 -->
              <span v-if="item.type == 'image'"><a :href="filterImageUrl(props.row[item.key])" target="_blank"><img v-if="props.row[item.key]" max-width="60" max-height="60" :src="filterImageUrl(props.row[item.key])"/><i style="font-style: normal;" v-else>无</i></a></span>
              <!-- SVG系统图 -->
              <span v-else-if="item.type == 'svg'">
                <el-button  size="mini" type="text" icon="el-icon-search" @click="handleViewSysGraph(props.row[item.key])">查看系统图</el-button>
              </span>
              <!-- 日期 -->
              <span v-else-if="item.type == 'date'">{{props.row[item.key] | dateFilter}}</span>
              <!-- 选项 -->
              <span v-else-if="item.type == 'select'">{{filterOptionLabel(props.row, item)}}</span>
              <span v-else>{{ props.row[item.key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>


      <el-table-column v-if="!item.isDetail" v-for="item in listColumn" :key="item.key" align="center" :label="item.label"
        :width= "(item.mainKey ? '60px' : (item.key == 'status' ? '80px' : ''))">
        <template slot-scope="scope">
          <!-- 文本 -->
          <span v-if="item.type == 'string'|| item.type == 'number'">
            {{scope.row[item.key]}}
          </span>
          <!-- 状态 -->
          <el-tag v-else-if="item.key == 'status'" :type="scope.row[item.key] | statusFilter">{{scope.row.status == "0" ? "正常" : (scope.row.status == "2" ? "维修中" : "停用")}}</el-tag>
          <!-- 日期 -->
          <span v-else-if="item.type == 'date'">{{scope.row[item.key] | dateFilter}}</span>
          <!-- 选项 -->
          <span v-else-if="item.type == 'select'">{{filterOptionLabel(scope.row, item)}}</span>
          <!-- 图片 -->
          <span v-else-if="item.type == 'image'"><a :href="filterImageUrl(scope.row[item.key])" target="_blank"><img class="table-image" :src="filterImageUrl(scope.row[item.key])"/></a></span>
          <!-- 坐标 -->
          <!-- <span v-else-if="item.type == 'location'">{{scope.row[item.key] | locationFilter}}</span> -->
        </template>
      </el-table-column>

    <!-- 进入子列表 -->
     <el-table-column v-if="subTable && subTable.length"  align="center" label="详情" class-name="small-padding fixed-width" min-width="100px">
      <template slot-scope="scope" >
        <div class="subTable-column">
        <template  v-for="sub in subTable" >
          <el-button v-if="sub.plain"  size="mini" type="primary" plain @click="handleSubTable(sub, scope.row)">{{sub.button}}
          </el-button>
          <el-button v-else  size="mini" type="primary" @click="handleSubTable(sub, scope.row)">{{sub.button}}
          </el-button>
        </template>
        </div>
      </template>
    </el-table-column>
      <!-- <el-table-column v-if="subTable.length" align="center" label="详情" class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <template  v-for="sub in subTable">
            <el-button v-if="sub.plain"  size="mini" type="primary" plain @click="handleSubTable(sub, scope.row)">{{sub.button}}
            </el-button>
            <el-button v-else  size="mini" type="primary" @click="handleSubTable(sub, scope.row)">{{sub.button}}
            </el-button>
          </template>
        </template>
      </el-table-column> -->

      <!-- 操作列 -->
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="120px" fixed="right">
        <template slot-scope="scope" >
          <el-button type="primary" plain icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
           <el-button type="danger" plain icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>
          </el-button>
        </template>
      </el-table-column>

    </el-table>



    <!-- 分页 -->
    <div class="pagination-container" v-if="!treeRoute.path">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 编辑框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="formRules" ref="dataForm" :model="temp" label-position="left" label-width="30%" style='margin-left:50px;margin-right:50px;'>
      	<el-form-item v-for="item in column" :key="item.key"
      		:label="item.label"
      		:prop="item.key">
          <!-- 文本 -->
      		<el-input v-if="item.type == 'string'" :disabled="item.isEdit == false" v-model="temp[item.key]"></el-input>
          <!-- 数字 -->
          <el-input v-if="item.type == 'number'" :disabled="item.isEdit == false" v-model.number="temp[item.key]"></el-input>
          <!-- 下拉选择框 -->
          <el-select v-else-if="item.type =='select'" class="filter-item" :disabled="item.isEdit == false" v-model="temp[item.key]" placeholder="请选择">
            <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" >
            </el-option>
          </el-select>
          <!-- date日期选择 -->
          <el-date-picker v-else-if="item.type == 'date'" value-format="timestamp" :disabled="item.isEdit == false" v-model="temp[item.key]" type="date" placeholder="选择日期"></el-date-picker>
          <!-- image URL -->
          <el-row v-else-if="item.type == 'image'">
            <el-col :span="12">
              <el-input v-model="temp[item.key]" type="text"></el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <cms-upload
                :module-name = "moduleName"
                :img-src = "temp[item.key]"
                :item-key = "item.key"
                @on-src-change = "onImgSrcChange">
              </cms-upload>
            </el-col>
          </el-row>
          <!-- 系统SVG图 -->
          <el-row v-else-if="item.type == 'svg'">
            <el-col :span="18">
              <el-input v-model="temp[item.key]" width="80%"></el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <el-button  @click="goToSysGraph(item.key)" type="primary" plain>编辑</el-button>
            </el-col>
          </el-row>
          <!-- 坐标 -->
          <!-- <el-row v-else-if="item.type == 'location'">
            <el-col :span="11">
              <el-input placeholder="经度" v-model="temp[item.key]"></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-input placeholder="纬度" v-model="temp[item.key]"></el-input>
            </el-col>
          </el-row> -->



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
import { parseTime } from '@/utils'
import { fetchList, insertData, editData, deleteData } from '@/api/api'
import request from '@/utils/request'

import Upload from '@/components/Upload/uploadImage.vue'


export default {
  name: 'grid',
  props: {
    moduleName: {
      type: String,
      default: function () {
        return ""
      }
    },
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
    connectModule: {
      type: Array,
      /*结构应为：
        [{
          moduleName: "electrician",  //相关联的模块名
          myKey: "createrid",         //本模块中关联的数据库字段
          connectKey: "id",           //关联的模块中的对应数据库字段
          displayKey: "name",         //显示在前端的字段
        }]
      */
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
    /*企业总体架构中，点击左边的树形结构，右边列表生成的查询对象
      由于树形结构的view中不存在路由的概念
      因此treeRoute等于原本应该存在在路由中的query和param的并集*/
    treeRoute: {
      type: Object,
      default: function () {
        return {
          params: null,
          query: null,
          path: ""
        }
      }
    },
    fetchList: {
      type: Function,
      default: fetchList
    },
    insertData: {
      type: Function,
      default: insertData
    },
    updateData: {
      type: Function,
      default: editData
    },
    deleteData: {
      type: Function,
      default: deleteData
    },
  },
  components: {
    'cms-upload': Upload,
  },
  created() {

    //初始化时，要看看有没有关联的模块，如果有的话
    //需要将关联模块的数据和本模块的数据关联起来
    //不能让用户填写，需要让用户选择，这样才可以避免出错
    if(this.connectModule.length) {
      this.isRender = false
      this.initConnectModuleColumn()
    }

    this.resetTemp()
    this.getList()

    /*this.column.forEach( (o,i) => {
      //把在列表中显示的列  和 在展开详情中显示的列区分出来
      if(o.isDetail) {
        this.detailColumn.push(o)
      }
      else {
        this.listColumn.push(o)
      }
    })*/

    //用于监听系统图配置页面传来的参数
    let _self = this
    window.addEventListener("message", function(event) {
      if(event.data && event.data.title == "powerCloudCMS-message") {
        //event.data.key是该系统图数据库字段的名称
        _self.temp[event.data.key] = event.data.svg
      }
    }, false);

  },
  data() {
    return {
      isRender: true,
      // listColumn: [],   //表格中展示的列
      // detailColumn: [], //点击展开，展示的详细信息，对应column中，isDetail:true的列
    	temp: null,       //该表结构对应的一条数据，用于添加、编辑等传递参数
    	list: null,  //显示的列表数据
      total: null, //总条目数
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      // formRules: {}
    }
  },
  computed: {
    //表单验证规则
    formRules: function() {
      //生成 表单校验规则
      //参照： https://github.com/yiminghe/async-validator
      let rules = {};
      this.column.forEach( (o,i) => {
        if(o.isEdit !== false) {
          let rule = {
            required: o.required,
            trigger: "blur",
            message: o.errorMessage,
            type: o.type
          }
          if(o.type == "select") {
            rule.trigger = "blur"
            if(o.options && typeof(o.options[0].value) == "number") {

              rule.type = "number"
            }
            else {
              rule.type = "string"
            }
          }
          else if(o.type == "image") {
            rule.type = "string"
            rule.message = o.errorMessage || "格式必须为URL"
          }
          else if(o.type == "date" || o.type == "number") {
            rule.type = "number"
          }
          else {
            rule.type = "string"
          }
          rules[o.key] = [rule]
        }
      })
      return rules
    },
    //表格中展示的列
    listColumn: function() {
      let arr = [];
      this.column.forEach( (o,i) => {
        //把在列表中显示的列  和 在展开详情中显示的列区分出来
        if(!o.isDetail) {
          arr.push(o)
        }
      })
      return arr
    },
    //点击展开，展示的详细信息，对应column中，isDetail:true的列
    detailColumn: function() {
      let arr = [];
      this.column.forEach( (o,i) => {
        //把在列表中显示的列  和 在展开详情中显示的列区分出来
        if(o.isDetail) {
          arr.push(o)
        }
      })
      return arr
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'warning',
      }
      return statusMap[status] || 'danger'
    },
    locationFilter(location) {
      try {
        let o = JSON.parse(location)
        return `经度：${o.longitude},纬度：${o.latitude}`
      }
      catch(e) {
        return location
      }
      // console.log(location)
    },
    dateFilter(timestamp) {
      if(!timestamp) return ""
      let now = new Date(timestamp);
      return [now.getFullYear(),format(now.getMonth()+1),format(now.getDate())].join("-");

      function format(v){
        return v < 10 ? "0"+v : v;
      }
    },

  },
  methods: {
  	getList() {
  		this.listLoading = true
      //如果是子表，则路由中的参数就是对应的父表的ID
      if(this.isSubTable || this.treeRoute.params) {
        let searchParams = {} //需要向后台传的过滤搜索字段
        //如果是树形结构点击出现的详情，则取树形结构模拟的route参数
        let routeParams = this.treeRoute.params || this.$route.params
        /*
        注意:该子表的父表可能还有父表，所以路由中的params有多个父表id
          例如：
          一级表->企业
          二级表->变电所(关联父表ID：companyid)
          三级表->变电所图纸(关联父表ID：electricitysubstationid)
          此时路由为：/Enterprise/customer/:companyid/electricitySubstation/:electricitysubstationid/electricitySubstation_pic
          此时 this.$route.params = {companyid: "1", electricitysubstationid: "1"}
          但由于electricitySubstation_pic中只直接关联二级表，并没有直接关联一级表
          因此，需要将electricitySubstation_pic表中真实存在的字段，和路由中的参数取交集
          此时，真正传给后台的search参数里，只有electricitysubstationid，并不需要传companyid
          心累T_T....
        */
        for(var p in routeParams) {
          if(this.temp.hasOwnProperty(p)) {
            searchParams[p] = /id$/.test(p) ? (+routeParams[p]) : routeParams[p]  //取交集
          }
        }
        //fetchList根据listQuery中的search参数传给后台，后台取出对应数据
        this.listQuery.search = JSON.stringify(searchParams)
      }

	    this.fetchList(this.moduleName, this.listQuery ).then(response => {
        this.list = response.data.items || []
	      this.total = response.data.total
	      this.listLoading = false
	    })
  	},
  	//清空 tmp数据
  	resetTemp() {
			this.temp = {}
      //合并路由中的参数
      let params = Object.assign({}, this.treeRoute.query || this.$route.query, this.treeRoute.params || this.$route.params)
      // console.log(params)
	    this.column.forEach( (o,i) => {
        /*赋值时，要查看当前的路由params和query,按照里面的特定参数
          把temp值填充完整，这些参数在添加时自动填充，且编辑时不可修改*/
        if(params.hasOwnProperty(o.key)) {
          this.$set(this.temp, o.key, +params[o.key]) //太恶心了 双向绑定的，要这么赋值
        }
        //没有特定值的，赋值为空
        else {
          this.$set(this.temp, o.key, typeof(o.default) == "undefined" ? null : o.default)
        }
	    })

	    // console.log(JSON.stringify(this.temp))
  	},
    //生成关联模块的column
    initConnectModuleColumn() {
      var function_arr = []
      this.connectModule.forEach( (o,i) => {
        if(o.moduleName && o.myKey && o.connectKey && o.displayKey) {
          function_arr.push(fetchList(o.moduleName))
        }
      })
      Promise.all(function_arr).then( response_arr => {
        response_arr.forEach( (response,i) => {
          let cm = this.connectModule[i]; //目前处理的关联模块
          let list = response.data.items || [];
          let options = [];
          list.forEach( (item,i) => {
            options.push({value: item[cm.connectKey], label: item[cm.displayKey]})
          })
          //赋值： 关联列的select的options
          this.column.forEach( (col,_i) => {
           if(col.key == cm.myKey) {
              col.type = "select"
              col.options = options;
              this.$set(this.column, _i, col)
              return
            }
          })
        })

        this.isRender = true
      })
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
      // console.log(this.temp)
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
  		this.deleteData(this.moduleName, param).then((res) => {
  			if(res.ok) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }
        else {
          this.$notify({
            title: '失败',
            message: res.data,
            type: 'error',
            duration: 2000
          })
        }

	      // this.getList();
  		})
    },
  	//新增数据
    addData() {
    	this.$refs['dataForm'].validate((valid) => {
        if (valid) {
        	this.insertData(this.moduleName, this.temp).then( (res) => {
        		this.dialogFormVisible = false;
        		if(res.ok) {
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })
              this.getList();
            }
            else {
              this.$notify({
                title: '失败',
                message: res.data,
                type: 'error',
                duration: 2000
              })
            }
        	})
        }
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // console.log(tempData)
          this.updateData(this.moduleName, tempData).then( (res) => {
            this.dialogFormVisible = false;
            if(res.ok) {
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              // this.getList();

              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }

            }
            else {
              this.$notify({
                title: '失败',
                message: res.data,
                type: 'error',
                duration: 2000
              })
            }
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
    handleSubTable(sub, row) {
      this.$router.push({path: `${this.treeRoute.path || this.$route.path}/${row.id}/${sub.path}`})
    },
    handleBack() {
      this.$router.back(-1)
    },
    //在列表中，将select的项目显示成label的形式，而非value
    filterOptionLabel(row, item) {
      let value = ""
      if(Array.isArray(item.options)) {
        item.options.forEach( (o,i) => {
          if(o.value == row[item.key]) {
            value = o.label || o.value
            return
          }
        })
        return value
      }
      else {
        return row[item.key]
      }
    },
    //显示图片
    filterImageUrl(filename) {
      let path = process.env.UPLOAD_URL + "img/";
      switch(this.moduleName) {
        case "customer":
          path += "customer/"
          break
        case "electrician":
        case "electrician_pic":
          path += "electrician/"
          break
        case "electricitySubstation_pic":
          path += "substation/"
          break
        case "electricitySubstation_low_pic":
          path += "cabinet/"
        break
      }
      return path + filename
    },
    goToSysGraph(key) {
      let win = window.open("http://localhost:8010/#/SysGraph")
      setTimeout( () => {
         win.postMessage({title:"powerCloudCMS-message", key: key}, '*');
         // this.$router.push({path: "/SysGraph"})
      }, 1000)
    },
    handleViewSysGraph(html) {
      this.$alert(`<div style="background:#272822;padding:20px">${html}</div>`, '系统图', {
        dangerouslyUseHTMLString: true
      });
    },
    onImgSrcChange(val, key) {
      this.temp[key] = val
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

  .table-image {
    cursor: pointer;
    max-width: 100px;
    max-height: 60px;
  }

  .subTable-column {
    display:flex;
    flex-wrap: wrap;
    justify-content:center;

    button {
      margin: 0!important;
      margin: 5px!important;
    }

  }
</style>