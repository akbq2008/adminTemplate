<template>
  <div>
    <div class="middle inline-block">
      <div v-for="(item,index) in fileList" :key="item.id" class="relative  inline-block middle mr-20 upload-img">
        <img :src="item.url" alt class="pointer preview-img" :style="{
        width: imgStyle.width,
        height: imgStyle.height
      }" @click="previewImg(item)" />
        <img @click="deletePic(index)" class="deleteBox pointer" src="@/components/Upload/images/close.png" />
      </div>
    </div>
    <div v-if="limit>currentNum||limit===1&&currentNum===0" class="el-upload middle">
      <el-upload ref="el-upload" class="el-upload mr-20" action
      :disabled="disabled"
      :http-request="myUpload" :before-upload="beforeUpload"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <p class="text-info pt-15" :class="{ hidden: hidden }">*{{ info }}</p>
    <overLay :src="currentImg" :isShow="isShow" @close="closeOverLay" />
  </div>
</template>

<script>
import {
  uploadImg
} from '@/api/upload'
import overLay from '@/components/Upload/overLay'
export default {
  components: {
    overLay
  },
  props: {
    // 数据
    data: {
      type: Array,
      default: () => []
    },
    // 文件大小
    fileSize: {
      type: Number,
      default: 2
    },
    // 文件数量限制
    limit: {
      type: Number,
      default: 1
    },
    // 是否隐藏文件上传信息
    hidden: {
      type: Boolean,
      defualt: true
    },
    // 图片样式
    imgStyle: {
      type: Object,
      default: () => {
        return {
          width: '148px',
          height: '148px'
        }
      }
    },
    // 文案提示信息
    info: {
      type: String,
      default: '建议上传尺寸500*500,jpg或png格式图片'
    },
    // 替换文案
    content: {
      type: String,
      default: '确认要替换图片吗？'
    },
    // 是否禁止上传
    disabled: {
      type: Boolean
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.fileList = val
        this.currentNum = this.fileList.length
      }
    }
  },
  data () {
    return {
      currentImg: '', // 预览的图片
      isShow: false,
      isError: false,
      fileList: [], // 上传文件列表
      currentNum: 0, // 已上传数量
      currentFile: ''
    }
  },
  mounted () {
    this.fileList = this.data
    this.currentNum = this.fileList.length
  },
  methods: {
    closeOverLay () {
      this.isShow = false
    },
    /**
       * @description: 预览图片
       * @param {type} url:图片url
       * @return:
       */
    previewImg (url) {
      this.currentImg = url
      this.isShow = true
    },

    /**
       * @description: 清除图片
       * @param {type} index:多张图片为索引
       * @return:
       */
    deletePic (index) {
      this.$confirm(this.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 多张图片
          if (index || index === 0) {
            this.fileList.splice(index, 1)
          }
          if (this.limit === 1) {
            // 单张
            this.fileList = []
          }
          this.$emit('close', this.fileList)
          this.currentNum--
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err !== 'cancel' ? err : '已取消删除'
          })
        })
    },

    /**
       * @description: 上传前的钩子
       * @param {type} file:file对象
       * @return:
       */
    beforeUpload (file) {
      try {
        let picRule = 'image/png,image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < this.fileSize
        if (!picRule.includes(file.type)) {
          this.$message.error('上传图片只能是jpg或png格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error(`上传图片大小不能超过${this.fileSize}MB!`)
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    myUpload (content, index) {
      let form = new FormData()
      form.append('imageFile', content.file)
      uploadImg(form).then(res => {
        const data = res.data
        if (data.code === 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.currentNum++
          this.fileList.push(data.url)
          this.$emit('success', this.fileList)
        } else {
          this.$message.error(data.message)
        }
      })
    }
  }
}

</script>

<style scoped lang="scss">
  .hidden {
    visibility: hidden;
  }

  .deleteBox {
    position: absolute;
    top: -17px;
    right: -18px;
    width: 32px;
    height: 32px
  }

  .preview-img {
    border: 1px solid #ddd;
  }

  .text-info {
    color: red;
  }

  /deep/ .el-upload-list {
    display: none;
  }

</style>
