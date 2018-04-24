<style lang="scss" scoped>
input.upload[type="file"] {
	display: inline-block;
}

.upload-btn {
  width: 80px;
}
</style>

<template>
  <el-row>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="actionUrl"
      :on-preview="handlePreview"
      :file-list="fileList"
      :auto-upload="false"
      :limit="1"
      accept = "image/*"
      :onError = "uploadError"
      :onSuccess = "uploadSuccess"
      :beforeUpload = "beforeUpload"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">图片大小不能超过2MB</div>
    </el-upload>
  </el-row>
</template>

<script>
export default {
  props: {
    moduleName: {
      default: ''
    },
    imgSrc: {
      default: ''
    },
    itemKey: {
      default: ''
    },
  },
  data () {
    return {
      myImgSrc: this.imgSrc, //data中新增字段
      fileList: [],
      actionUrl: process.env.BASE_API + "cms/upload?type=" + this.filterType(this.moduleName)
    }
  },
  watch: {
    imgSrc(val) {
      this.myImgSrc = val;//新增imgSrc的watch，监听变更并同步到myImgSrc上
    },
    myImgSrc(val){
      this.$emit("on-src-change", val, this.itemKey);//③组件内对myImgSrc变更后向外部发送事件通知
    }
  },
  methods: {
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件', response)
      if(response.ok) {
        this.myImgSrc = response.data
      }
      this.$refs.upload.clearFiles()
    },
    // 上传错误
    uploadError (response, file, fileList) {
      this.$alert('上传失败，请重试！')
      this.$refs.upload.clearFiles()
    },
    // 上传前对文件的大小的判断
    beforeUpload (file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$alert('上传图片大小不能超过 2MB!');
      }
      return isLt2M
    },
    handlePreview: function (file) {
      if (file && file.url) {
        window.open(file.url)
      }
    },
    submitUpload: function (e) {
      this.$refs.upload.submit();
    },
    filterType: function(v) {
      let type = "customer"
      switch(v) {
        case "customer":
          type = "customer"
          break
        case "electrician":
        case "electrician_pic":
          type = "electrician"
          break
        case "electricitySubstation_pic":
          type = "substation"
          break
        case "electricitySubstation_low_pic":
          type = "cabinet"
        break
      }
      return type
    }
  }
}

</script>