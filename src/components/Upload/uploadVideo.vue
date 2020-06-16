<template>
  <div>
    <video ref="videoBox" controls :src="currentUrl" class="videoBox" />
    <div v-if="videoUrl" class="relative inline-block">
      <video controls :src="videoUrl" class="video" />
      <img src="@/components/Upload/images/close.png" alt class="close" @click="closeVideo">
    </div>
    <div v-else class="el-upload">
      <el-upload ref="upload" class="el-upload" action="/upload/upload-video" :http-request="myUpload"
        :before-upload="beforeUpload" list-type="picture-card" accept=".mp4" :on-progress="uploadVideoProcess"
        :limit="limit">
        <i class="el-icon-plus" />
      </el-upload>
      <p class="text-info" :class="{ hidden: hidden }">*{{ info }}</p>
    </div>
  </div>
</template>

<script>
// import { uploadVideo } from '@/api/upload'
export default {
  props: {
    limit: {
      type: Number,
      default: 0
    },
    hidden: {
      type: Boolean,
      defualt: true
    },
    imgStyle: {
      type: Object,
      default: () => {
        return {
          width: '200px',
          height: '200px'
        }
      }
    },
    videoUrl: {
      type: String,
      required: true,
      default: ''
    },
    info: {
      type: String,
      default: '建议上传尺寸500*500,jpg或png格式图片'
    },
    content: {
      type: String,
      default: '确认要替换视频吗？'
    }
  },
  data () {
    return {
      currentImg: '',
      isShow: false,
      currentUrl: ''
    }
  },
  methods: {
    uploadVideoProcess (e, file, fileList) {
      console.log(e, file, fileList)
    },
    /**
       *
       * @param {*} key   清空的值
       */
    closeVideo (vm) {
      this.$confirm(this.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('emptyVideo')
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err !== 'cancel' ? err : '已取消删除'
          })
        })
    },
    beforeUpload (file) {},
    myUpload (content, index) {
      const form = new FormData()
      form.append('file', content.file)
      // uploadVideo(form).then(res => {
      //   const data = res.data
      //   if (data.code === 200) {
      //     this.currentUrl = data.data
      //     this.$nextTick(() => {
      //       const _this = this
      //       _this.$refs.videoBox.oncanplay = function () {
      //         if (_this.$refs.videoBox.duration > 15) {
      //           _this.$message.error('视频时间应小于15秒')
      //           _this.$refs.upload.clearFiles()
      //           return false
      //         } else {
      //           _this.$message({
      //             message: '上传成功',
      //             type: 'success'
      //           })
      //           _this.$emit('uploadVideoSuccess', data.data)
      //         }
      //       }
      //     })
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: data.message,
      //       type: 'error'
      //     })
      //   }
      // })
    }
  }
}

</script>

<style scoped>
  .videoBox {
    visibility: hidden;
    width: 0;
    height: 0
  }

  .video {
    width: 800px;
    height: 400px
  }

  .hidden {
    visibility: hidden;
  }

  .deleteBox {
    position: absolute;
    top: -17px;
    right: -18px;
  }

  .close {
    cursor: pointer;
    position: absolute;
    right: -27px;
    top: -19px;
  }

  .text-info {
    color: red;
  }

</style>
