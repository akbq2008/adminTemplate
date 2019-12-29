<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
    >上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <div class="pic_wrap">
        <el-upload
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :http-request="myUpload"
          :before-upload="beforeUpload"
          list-type="picture-card"
          :action="imgUrl()"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </div>
      <div class="ct p_up">
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { uploadImg } from '@/api/upload'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      )
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (arr.length === 0) {
        this.$message(
          '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！'
        )
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      const picRule = 'image/png,image/jpeg,image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!picRule.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG，png 格式!')
        return
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
    },
    myUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.file.uid
      this.listObj[fileName] = {}
      const form = new FormData()
      form.append('imageFile', file.file)
      uploadImg(form).then(res => {
        const data = res.data
        if (data.data) {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = _URL.createObjectURL(file.file)
            img.onload = function () {
              _self.listObj[fileName] = {
                hasSuccess: false,
                uid: file.file.uid,
                width: this.width,
                height: this.height,
                url: data.data.path,
                id: data.data.id
              }
            }
            resolve(true)
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
