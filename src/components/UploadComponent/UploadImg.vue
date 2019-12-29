<template>
  <div style="position:relative">
    <div
      v-if="imgUrl"
      class="relative"
    >
      <img
        :src="imgUrl"
        alt
        class="pointer"
        :style="{
          width: imgStyle.width,
          height: imgStyle.height
        }"
        @click="gUrl"
      >
      <img
        v-if="canEdit"
        class="deleteBox pointer"
        src="/static/images/close.png"
        style="width:32px;height:32px"
        @click="deletePic(this)"
      >
    </div>
    <div
      v-else
      class="el-upload"
    >
      <el-upload
        ref="el-upload"
        v-loading="loading"
        class="el-upload"
        action
        :disabled="!canEdit"
        :http-request="myUpload"
        :before-upload="beforeUpload"
        list-type="picture-card"
        :limit="limitNum"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <p class="infoTip">
      {{ info }}
    </p>
    <overLay
      :src="currentImg"
      :is-show="isShow"
      @closeOverLay="closeOverLay"
    />
  </div>
</template>

<script>
// import { uploadImg } from '@/api/upload';
import overLay from './VideoOverLay'
export default {
  components: {
    overLay
  },
  props: {
    // 图片上传后是否能编辑
    canEdit: {
      type: Boolean,
      default: true
    },
    // 上传文件大小限制
    limitSize: {
      type: Number,
      default: 2
    },
    // 上传文件数量限制
    limitNum: {
      type: Number,
      default: 0
    },
    // 图片样式
    imgStyle: {
      type: Object,
      default: () => {
        return {
          width: '200px',
          height: '200px'
        }
      }
    },
    // 图片url
    imgUrl: {
      type: String,
      default: '',
      required: true
    },
    // info信息
    info: {
      type: String,
      default: '建议上传尺寸500*500,jpg或png格式图片'
    },
    // 清空时的提示信息
    content: {
      type: String,
      default: '确认要替换图片吗？'
    }
  },
  data () {
    return {
      currentImg: '',
      isShow: false,
      isError: false,
      fileList: [],
      loading: false
    }
  },
  methods: {
    closeOverLay () {
      this.isShow = false
    },
    previewImg (url) {
      this.currentImg = url
      this.isShow = true
    },
    /**
     *
     * @param {*} key   清空的值
     */
    deletePic (vm) {
      this.$confirm(
        this.content ? this.content : '确定要删除图片吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$emit('emptyImgUrl')
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err !== 'cancel' ? err : '已取消'
          })
        })
    },

    beforeUpload (file) {
      try {
        const picRule = 'image/png,image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < this.limitSize
        if (!picRule.includes(file.type)) {
          this.$message.error('上传图片只能是jpg或png格式!')
          return false
        }

        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    myUpload (content, index) {
      this.loading = true
      const form = new FormData()
      form.append('imageFile', content.file)
      // uploadImg(form).then(res => {
      //   const data = res.data;
      //   if (data.code === 200) {
      //     this.$message({
      //       message: '上传成功',
      //       type: 'success'
      //     });
      //     this.$emit('uploadSuccess', data.data);
      //   } else {
      //     this.$message.error(data.message);
      //   }
      //   this.loading = false;
      // });
    }
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}
.deleteBox {
  position: absolute;
  top: -17px;
  right: -18px;
}
.infoTip {
  position: absolute;
  bottom: -30px;
  color: red;
}
</style>
