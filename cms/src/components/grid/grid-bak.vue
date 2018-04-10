<style lang="sass" scoped>
.grid-wrapper {
  margin: 20px 20px 20px 240px;
  min-width: 850px;
}

.caption {
  height: 40px;
  padding: 5px 10px;
  line-height: 30px;
  background-color: #307ecc;

  span {
    color: #fff;
    font-size: 15px;
  }

  a {
    color: #fff;
    font-size: 12px;
    margin-left: 20px;
    cursor: pointer;
  }

  .search {
    float: right;
    height: 28px;
    text-align: right;

    select {
      height: 28px;
      margin-right: 10px;
      vertical-align: middle;
    }

    input {
      line-height: 20px;
      padding: 2px 5px;
      vertical-align: middle;
    }
  }
}

.grid {
  width: 100%;
  min-width: 800px;

  thead {
    background-color: #307ecc;
  }
  tr {
    background-color: #f9f9f9;

    &:nth-child(even) {
      background-color: #fff;
    }
    &:hover {
      background-color: #f0f0f0;
    }
  }
  th {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -user-select: none;
    font-weight: bold;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#ebebeb));
    border: 0 none;
    min-width: 80px;

    &.operation {
      text-align: center;
    }
  }
  th:first-child {
    width: 30px;
    min-width: 30px;
  }
  th.active {
    color: #f00;
  }
  th.active .arrow {
    opacity: 1;
  }
  td {
    &:last-child {
      text-align: center;
    }
  }
  th, td {
    padding: 9px;
    border: 1px solid #e1e1e1;
    word-break: break-all;
    vertical-align: middle!important;
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.5;
  }
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #999;
  }
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #999;
  }
}

.edit-mode {
  .cancel {
    margin: 0 0 10px;
  }
  .grid {
    td {
      text-align: left;
    }
    td[colspan] {
      text-align: center;
    }
    input[type="url"],
    input[type="text"] {
      width: 300px;
    }
    textarea {
      width: 300px;
      height: 120px;
    }
  }
  .error {
    color: #fe0e0e;
  }
  .info {
    color: #19a961;
    font-weight:bold
  }
}

.glyphicon {
  cursor: pointer;
}
.glyphicon-edit {
  color: #478fca;
}
.glyphicon-trash {
  color: #dd5a43;
}
.glyphicon-zoom-in {
  color: #26a529;
}
.glyphicon-plus-sign {
  color: #a069c3;
}
.glyphicon-list-alt {
  color: #777;
}
.sub-list {
  color: #2FAD19;
}

.page {
  background: #EFF3F8;
  padding: 10px 5px;

  input {
    width: 30px;
    text-align: center;
  }
  p {
    display: inline-block;
    float: right;
  }
  [disabled] {
    opacity: .4;
  }
}
</style>

<template>
  <div class="grid-wrapper">
    <div v-show="mode==='list'">
      <div class="caption">
        <span>{{caption}}</span>
        <a @click="goList" v-show="pTable">返回上级表单</a>
        <form class="search" onsubmit="return false" v-show="(option&16)!==16">
          <select v-model="kwType" @change="clearKW">
            <option v-for="key in column" :value="key">{{columnMap[key].title || key}}</option>
          </select>
          <template v-if="columnMap[kwType].type!=='select'">
            <input type="search" placeholder="输入搜索内容" v-model="kw" @keyup.enter="search">
          </template>
          <template v-else>
            <select @change="search" v-model="kw">
              <option value=""></option>
              <option v-for="option in columnMap[kwType].options" :value="option.value">
                {{option.text}}
              </option>
            </select>
          </template>
        </form>
      </div>
      <table class="grid" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th><input type="checkbox" @click="checkAll" v-model="allChecked"></th>
            <th v-for="key in column"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
              v-if="!columnMap[key].hide"
              >
                {{columnMap[key].title || key}}
              <span class="arrow"
                :class="sortOrder[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
            <th class="operation" v-show="(option&3)!==3 || subTable">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="
            item in list
            | orderBy sortKey sortOrder[sortKey]">
            <td><input type="checkbox" :value="item.id" v-model="checkedArr"></td>
            <td v-for="key in column" v-if="!columnMap[key].hide">
              <a target="_blank" :href="item[key]" v-if="columnMap[key].type==='image'">
                <img :src="item[key]" width="40" height="40">
              </a>
              <a target="_blank" :href="item[key]" v-if="columnMap[key].type==='url'">
                {{item[key]}}
              </a>
              <a target="_blank" :href="item[key]" v-if="columnMap[key].type==='image-url'">
                <img :src="item[key]" width="40" height="40">
              </a>
              <template v-if="columnMap[key].type==='game-classify'">{{item[key] | getClassifyAndWeight columnMap[key].options item  }}</template>
              <template v-if="columnMap[key].type==='datetime'">{{item[key]}}</template>
              <template v-if="!columnMap[key].type || columnMap[key].type==='text' || columnMap[key].type==='textarea' || columnMap[key].type==='number' || columnMap[key].type==='textarea-template'">{{item[key]}}</template>
              <template v-if="columnMap[key].type==='select'"><span v-bind:style="item[key] | getOptionStyle columnMap[key].options">{{item[key] | getOptionText columnMap[key].options}}</span></template>
              <template v-if="columnMap[key].type==='select-map'">{{item[key] | getOptionText selectMap[columnMap[key].optionKey]}}</template>
            </td>
            <td v-show="(option&3)!==3 || subTable">
              <span class="glyphicon glyphicon-list-alt" :class="{'sub-list':item.count}" @click="goSubList(item.id)" title="进入子列表" v-show="subTable"></span>
              <span class="glyphicon glyphicon-edit" @click="switchMode('edit', item.id)" title="编辑" v-show="(option&2)!==2"></span>
              <span class="glyphicon glyphicon-trash" @click="del([item.id])" title="删除" v-show="(option&4)!==4"></span>
              <span class="glyphicon glyphicon-zoom-in" @click="preview(item.module_name,item.id)" title="预览" v-show="(option&32)==32"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page" v-show="mode==='list' && (option&8)!==8">
      <span class="glyphicon glyphicon-plus-sign" @click="switchMode('add')" title="新增" v-show="(option&1)!==1"></span>
      <span class="glyphicon glyphicon-trash" @click="delAll" title="批量删除" v-show="(option&4)!==4"></span>
      <p>
        <button class="glyphicon glyphicon-chevron-left" @click="goPage(-1)" :disabled="pageNo<=1" type="button"></button>
        第 <input v-model="pageNo" @keyup.enter="goPage(0)"> 页 / 共 {{pageCount}} 页
        <button class="glyphicon glyphicon-chevron-right" @click="goPage(1)" :disabled="pageNo>=pageCount" type="button"></button>
      </p>
    </div>

    <div class="edit-mode" v-show="mode==='edit'">
      <p class="cancel">
        <button @click="switchMode('list')" type="button">返回</button>
      </p>
      <form onsubmit="return false">
        <table class="grid" cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr v-for="key in column" v-if="isColumnShow[key]">
                <td>{{columnMap[key].title | getWeightText  columnMap}}</td>
              <td>
                <p class="error" v-show="!validation[key]">{{columnMap[key].errorStr}}</p>
                <template v-if="columnMap[key].type==='number'">
                  <input :name="key" type="number" v-model="editData[key]">
                </template>
                <template v-if="columnMap[key].type==='url'">
                  <input :name="key" type="url" v-model="editData[key]">
                </template>
                <template v-if="columnMap[key].type==='image-url'">
                  <input :name="key" type="url" v-model="editData[key]">
                </template>
                <template v-if="columnMap[key].type==='image'">
                  <input :name="key" type="text" v-model="editData[key]">
                  <cms-upload
                    :img-src.sync="editData[key]"
                    :is-rename="columnMap[key].isRename">
                  </cms-upload>
                </template>
                <template v-if="columnMap[key].type==='select'">
                  <select v-model="editData[key]" >
                    <option v-for="option in columnMap[key].options" :value="option.value">
                      {{option.text}}
                    </option>
                  </select>
                </template>
                <template v-if="columnMap[key].type==='select-map'">
                  <select v-model="editData[key]">
                    <option v-for="option in selectMap[columnMap[key].optionKey]" :value="option.value">
                      {{option.text}}
                    </option>
                  </select>
                </template>
                <template v-if="columnMap[key].type==='datetime'">
                  <input :name="key" type="datetime-local" v-model="editData[key] | datetime" step="2">
                </template>
                <template v-if="columnMap[key].type==='textarea-template'">
                  <textarea :name="key" v-model="editData[key]"></textarea>
                  <cms-textarea
                    :action-url="columnMap[key].openUrl"
                    :content.sync="editData[key]">
                  </cms-textarea>
                </template>
                <template v-if="columnMap[key].type==='game-classify'">
                   <cms-checkbox-classify
                    :column-map="columnMap[key].options"
                    :content.sync="editData[key]"
                  >
                  </cms-checkbox-classify>
                </template>
                <template v-if="columnMap[key].type==='game-classify-weight'">
                   <cms-checkbox-classify
                    :column-map="columnMap[key].options"
                    :content.sync="editData[key]"
                  >
                  </cms-checkbox-classify>
                </template>
                <template v-if="!columnMap[key].type || columnMap[key].type==='text'">
                  <input :name="key" type="text" v-model="editData[key]">
                </template>
                <template v-if="columnMap[key].type==='textarea'">
                  <textarea :name="key" v-model="editData[key]"></textarea>
                </template>
                <span class="info" v-if="columnMap[key].infoStr">{{columnMap[key].infoStr}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button v-if="table==='box_url_pop'" @click="autoFillIn()" type="button">自动填充</button>
                <button @click="submit(editData.id)" type="button">提交</button>
                <button @click="reset(editData.id)" type="button">重置</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

  </div>

</template>

<script>

import Resource from 'vue-resource'
import Upload from './upload_img.vue'
import TextareaTemplate from './textarea_template.vue'
import CheckboxClassifyTemplate from './checkbox_classify.vue'

export default {
  props: {
    caption: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    column: {
      type: Array,
      default: function () {
        return []
      }
    },
    columnMap: {
      type: Object,
      default: function () {
        return {}
      }
    },
    table: {
      required: true,
      type: String
    },
    pageNo: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      default: 1
    },
    pTable: {
      type: String,
      default: ''
    },
    subTable: {
      type: String,
      default: ''
    },
    // 二进制位表示, 32(启用预览)16(禁用搜索)8(禁用翻页)4(禁用删除)2(禁用编辑)1(禁用新增)
    option: {
      type: Number,
      default: 0,
      coerce: function (val) {
        return val ? parseInt(val, 10) : 0
      }
    },
    selectMap: {
      default: function () {
        return {}
      }
    }
  },
  components: {
    'cms-upload': Upload,
    'cms-textarea': TextareaTemplate,
    'cms-checkbox-classify': CheckboxClassifyTemplate,
  },
  filters: {
    datetime: {
      read: function (val) {
        val = val || ''
        return val.replace(/\s+/, 'T')
      },
      write: function (val) {
        val = val || ''
        return val.replace(/t/i, ' ')
      }
    },
    getOptionText: function (val ,arr) {
      var arr = arr || []
      arr = arr.filter(n => {
        return n.value == val ? true : false
      })
      return arr.length ? arr[0].text : val
    },
    getOptionStyle: function (val ,arr) {
      var arr = arr || []
      arr = arr.filter(n => {
        return n.value == val ? true : false
      })
      return arr.length ? arr[0].style : {}
    },
    getClassifyAndWeight: function (val, arr, item){
      var classify_arr = val.split("_")
      var classify_text_arr = []
      classify_arr.forEach( (o,i) => {
        arr.forEach(function(n,j){
          if(n.value == o){
            classify_text_arr.push(n.text+":"+item['weight_'+o])
            return
          }
        })
      })

      return classify_text_arr.join("_")

    },
    //如果是权重，则根据分类名，获取权重的title，如果不是权重，则直接返回title
    getWeightText : function (val, arr){
      //weightTitle : weight_0  weight_1 weight_2
      if(val && (/^weight_/.test(val)) && arr && arr["classify"]){
        var classifyOptions = arr["classify"].options
        classifyOptions = classifyOptions.filter(n => {
          return n.value == (val.split("_"))[1] ? true : false
        })

        return "权重_" + classifyOptions[0].text

      }
      return val
    }
  },
  data () {
    var ctx = this
    var sortOrder = {}
    this.column.forEach(key => sortOrder[key] = 1)
    var getUrl = function () {
      var path = '/' + ctx.table + '/'
      var id = location.pathname.match(new RegExp('^' + path +'(\\d+)', 'i'))
      id = Array.isArray(id) ? id[1] : ''
      if (ctx.pTable && id) {
        path += id + '/'
      }
      return path
    }
    return {
      sortKey: '',
      sortOrder: sortOrder,
      mode: 'list',
      editData: {},
      kwType: this.column[0],
      kw: '',
      allChecked: false,
      checkedArr: [],
      actionUrl: getUrl()
    };
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrder[key] = this.sortOrder[key] * -1
    },
    checkAll: function (e) {
      if (!this.allChecked) {
        this.checkedArr = this.list.map((n) => {
          return n.id
        })
      }
      else {
        this.checkedArr = []
      }
    },
    switchMode: function (val, id) {
      switch (val) {
        case 'edit':
          this.edit(id)
          break
        case 'list':
          break
        case 'add':
          this.editData = {}
          val = 'edit'
          break
      }
      this.mode = val
    },
    submit: function (id) {
      var ctx = this
      var data = {}
      var url
      id = id || ''
      if (!ctx.isValid) {
        return
      }
      //判断 是否为重复字段
      var checkUniqueArr = []
      for (let key in ctx.editData) {
        ctx.columnMap[key].isCheckUnique ? checkUniqueArr.push({
          table : ctx.table,
          key   : key,
          value : ctx.editData[key],
          id    : id
        }) : null
      }

      Promise.all(checkUniqueArr.map( (n) => {
        var url = "http://" + location.host + "/ajax/checkUnique?table="+n.table+"&key="+n.key+"&value="+n.value+"&id="+n.id;
          return ctx.$http.get(url).then((result) => {
            if (result.data.err) {
              console.log(result.data.err)
              return {
                key:n.key,
                res:false
              }
            }
            else {
              return {
                key:n.key,
                res:result.data.data
              }
            }
          }, (e) => {
            return {
              key:n.key,
              res:false
            }
          })
      }) )
      .then(function(resArr){
        var isCheckUniqueValid = true;
        var repeatTitle;
        resArr.map( (n) => {
          isCheckUniqueValid = isCheckUniqueValid && n.res
          //如果有重复的值，则把该值清空，并报错
          if(!n.res){
            ctx.validation[n.key] = n.res
            repeatTitle = ctx.columnMap[n.key].title
            return
          }
        })

        if(!isCheckUniqueValid){
          alert("“"+repeatTitle+"“ 有重复!")
          return
        }

        if (id) {
          let arr = ctx.list.filter((n) => {
            if (n.id == id) {
              return n
            }
          })
          for (let key in ctx.editData) {
            if (ctx.editData[key] != arr[0][key]) {
              data[key] = ctx.editData[key]
            }
          }
        }
        // 添加
        else {
          for (let key in ctx.editData) {
            data[key] = ctx.editData[key]
          }
        }
        // 提交的url
        url = ctx.actionUrl + 'edit/' + id + '?pageNo=' + ctx.pageNo
        if (ctx.kw) {
          url += '&kwType=' + ctx.kwType
          url += '&kw=' + encodeURIComponent(ctx.kw)
        }
        url += '&t=' + Date.now()

        if (Object.keys(data).length) {
          ctx.$http.post(url, data).then((result) => {
            if (result.data.err) {
              alert(result.data.errorStr)
            }
            else {
              ctx.kw = result.data.kw || ctx.kw
              ctx.kwType = result.data.kwType || ctx.kwType
              ctx.pageNo = result.data.pageNo
              ctx.pageCount = result.data.pageCount
              ctx.list = result.data.list
              ctx.switchMode('list')
            }

          }, (err) => {
            console.log(err)
          })
        }
      })


    },
    reset: function (id) {
      this.editData = {}
    },
    edit: function (id) {
      var arr = this.list.filter((n) => {
        if (n.id == id) {
          return n
        }
      })
      if (arr.length) {
        this.editData = Object.assign({}, arr[0])
      }
      else {
        this.editData = {}
      }
    },
    del: function (idArr) {
      var ctx = this
      var url
      if (!confirm('是否确认删除?')) {
        return
      }
      // 提交的url
      url = ctx.actionUrl + 'del/?pageNo=' + ctx.pageNo
      if (ctx.kw) {
        url += '&kwType=' + ctx.kwType
        url += '&kw=' + encodeURIComponent(ctx.kw)
      }
      url += '&t=' + Date.now()

      this.$http.post(url, {
        ids: idArr
      }).then((result) => {
        if (result.data.err) {
          alert(result.data.errorStr)
        }
        else {
          ctx.kw = result.data.kw || ctx.kw
          ctx.kwType = result.data.kwType || ctx.kwType
          ctx.pageNo = result.data.pageNo
          ctx.pageCount = result.data.pageCount
          ctx.list = result.data.list
          ctx.allChecked = false
        }
      }, (err) => {
        alert(err)
      })
    },
    delAll: function () {
      if (this.checkedArr.length) {
        this.del(this.checkedArr)
      }
      else {
        alert('请选择删除项')
      }
    },
    search: function (e) {
      var ctx = this
      this.$http.get(ctx.actionUrl + 'list', {
        isJson: true,
        kw: ctx.kw,
        kwType: ctx.kwType
      }).then((result) => {
        if (result.data.err) {
          alert(result.data.errorStr)
        }
        else {
          ctx.kw = result.data.kw
          ctx.kwType = result.data.kwType
          ctx.pageNo = result.data.pageNo
          ctx.pageCount = result.data.pageCount
          ctx.list = result.data.list
        }
      }, (err) => {
        alert(err)
      })
    },
    clearKW: function (e) {
      this.kw = ''
    },
    goPage: function (val) {
      var ctx = this
      ctx.pageNo = +ctx.pageNo + val < 1 ? 1 : +ctx.pageNo + val
      this.$http.get(ctx.actionUrl + 'list', {
        isJson: true,
        pageNo: ctx.pageNo,
        kw: ctx.kw,
        kwType: ctx.kwType
      }).then((result) => {
        if (result.data.err) {
          alert(result.data.errorStr)
        }
        else {
          ctx.kw = result.data.kw
          ctx.kwType = result.data.kwType
          ctx.pageNo = result.data.pageNo
          ctx.pageCount = result.data.pageCount
          ctx.list = result.data.list
        }
      }, (err) => {
        alert(err)
      })
    },
    goSubList: function (id) {
      location.href = '/' + this.subTable + '/' + id
    },
    goList: function () {
      location.href = '/' + this.pTable
    },
    preview: function(module_name,id){
      window.open("http://game.browser.qq.com?profileId="+id)
    },
    autoFillIn: function(){
      var ctx = this
      var url = "http://" + location.host + "/ajax/getWebGameInfo?appid="+ctx.editData['appid'];
      return ctx.$http.get(url).then((result) => {
        if (result.err || result.data.err) {
          alert('检索异常!')
        }
        else {
          var data = result.data.data

          if(data){
            for(var key in data){
              if(ctx.columnMap[key]){
                //直接赋值是不响应的！这样才可以！！！
                ctx.$set('editData.'+key,data[key])
              }
            }
          }
          else{
            for(var key in ctx.columnMap){
              if(key == "appid" || key == "urlPattern") continue
              if(ctx.editData[key] && typeof(ctx.editData[key]) !== "function"){
                tx.$set('editData.'+key,"")
              }
            }
          }
        }
      }, (e) => {
        console.error(e)
        alert('检索异常!')
      })
    }
  },
  computed: {
    validation: function () {
      var ctx = this
      var valid = {}
      ctx.column.map((n) => {
        if (ctx.columnMap[n].editable !== false && ctx.columnMap[n].isValid) {
          valid[n] = ctx.columnMap[n].isValid(ctx.editData[n])
        }
        else {
          valid[n] = true
        }
      })
      return valid
    },
    isValid: function () {
      var validation = Object.assign(this.validation,{})

      if(this.table == "box_bar_push"){
        if(this.editData["behavior"] == 1){
          delete validation["giftid"]
        }
        else if(this.editData["behavior"] == 2){
          delete validation["giftid"]
          delete validation["url_push"]
        }
        else if(this.editData["behavior"] == 3){
          delete validation["url_push"]
        }
      }
      return Object.keys(validation).every(function (key) {
        return validation[key]

      })
    },
    isColumnShow: function(){
      var ctx = this;
      var obj = {};
      //一开始，全部为true:显示
      for(var key in ctx.columnMap){
        obj[key] = !(ctx.columnMap[key].editable == false)
      }
      //小弹条推送里面的逻辑
      if(ctx.table == "box_bar_push"){
        obj["url_push"] = false;
        obj["giftid"] = false;
        if(ctx.editData && ctx.editData["behavior"]){
          obj["url_push"] = (ctx.editData["behavior"] == 1) //跳转到指定URL;
          obj["giftid"] = (ctx.editData["behavior"] == 3) //指定礼包闪烁;
        }
      }
      //热门页游 网络游戏 手机游戏
      else if(ctx.table == "new_web_game_hot" || ctx.table == "new_pc_game" || ctx.table == "new_mobile_game"){
        //首先隐藏所有的权重 weight_X
        for(var key in ctx.columnMap){
          /^weight_/.test(key) ? obj[key] = false : null
        }
        //遍历当前的分类，如果有该分类，则把对应的权重显示出来
        if(ctx.editData && ctx.editData["classify"]){
          var classifyData = ctx.editData["classify"].split("_")
          classifyData.forEach(function(n,i) {
            obj["weight_"+n] = true
          })
        }

      }
      return obj
    }

  }

}

</script>