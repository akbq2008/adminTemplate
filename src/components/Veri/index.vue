<template>
<el-button
	style="width:112px;box-sizing:border-box;"
	type="primary"
	:disabled="canClick"
	@click="getVerificationCode"
>{{ buttonText }}</el-button>
</template>

<script>
import { sendMs } from '@/api/user';
export default {
  props: {
    phone: {
      type: String
    }
  },
  data() {
    return {
      buttonText: '发送验证码',
      canClick: false
    };
  },
  methods: {
    getVerificationCode() {
      if (!this.phone) {
        this.$message.error('请输入手机号');
        return;
      }
      if (!/^1(3|4|6|5|7|8)\d{9}$/.test(this.phone)) {
        this.$message.error('请输入正确手机号');
        return;
      }
      // 短信验证码函数
      let form = {
        phone: this.phone
      };
      sendMs(form).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '发送成功'
          });
        } else {
          this.$message.error(res.data.message);
        }
      });

      let time = 60;
      let timeId = ''; // 多次点击的时候直接给同一个赋值
      this.canClick = true;
      let _this = this;
      function fn() {
        if (time > 0) {
          _this.buttonText = time;
          time--;
          clearTimeout(timeId);
          timeId = setTimeout(fn, 1000);
        } else {
          _this.canClick = false;
          time = 60;
          _this.buttonText = '发送验证码';
        }
      }
      timeId = setTimeout(fn, 0);
    }
  }
};
</script>

<style scoped>
</style>
