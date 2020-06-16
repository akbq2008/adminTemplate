<!--
 * @Author: wang_yechao
 * @Date: 2020-01-27 10:43:22
 -->
<template>
  <el-button
    style="width:112px;box-sizing:border-box;"
    type="primary"
    :disabled="canClick"
    @click="getVerificationCode"
  >{{ buttonText }}</el-button>
</template>

<script>
// import { sendMs } from '@/api/user'
export default {
  props: {
    // 手机号码
    phone: {
      type: String,
      default: ''
    },
    // 验证码间隔时间
    time: {
      type: Number,
      default: 60
    },
    // 验证码文案
    txt: {
      type: String,
      default: '发送验证码'
    }
  },
  data () {
    return {
      canClick: false, // 是否能够点击
      lastTime: '', // 验证码间隔时间
      buttonText: '' // 文案
    }
  },
  created () {
    this.lastTime = this.time
    this.buttonText = this.txt
  },
  methods: {
    getVerificationCode () {
      if (!this.phone) {
        this.$message.error('请输入手机号')
        return
      }
      if (!/^1(3|4|6|5|7|8)\d{9}$/.test(this.phone)) {
        this.$message.error('请输入正确手机号')
        return
      }
      // 短信验证码函数
      // const form = {
      //   phone: this.phone
      // }
      // sendMs(form).then(res => {
      //   if (res.data.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '发送成功'
      //     })
      //   } else {
      //     this.$message.error(res.data.message)
      //   }
      // })

      let timeId = '' // 多次点击的时候直接给同一个赋值
      this.canClick = true
      const _this = this
      function fn () {
        if (_this.lastTime > 0) {
          _this.buttonText = _this.lastTime
          _this.lastTime--
          clearTimeout(timeId)
          timeId = setTimeout(fn, 1000)
        } else {
          _this.canClick = false
          _this.lastTime = _this.time
          _this.buttonText = '发送验证码'
        }
      }
      timeId = setTimeout(fn, 0)
    }
  }
}
</script>

<style scoped>
</style>
