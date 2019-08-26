<template>
<div class="bg_wt">
	<h2>修改密码</h2>
	<el-form ref="form" label-width="120px">
		<el-form-item label="手机号码：">
			<el-input v-model="user.phone" placeholder="请输入手机号码" style="width:200px" />
		</el-form-item>
		<el-form-item label="验证码：">
			<el-input v-model="user.code" placeholder="请输入验证码" style="width:200px" />
			<Veri :phone="user.phone" msType="2" />
		</el-form-item>
		<el-form-item label="新的密码：">
			<el-input placeholder="请输入密码" v-model="user.password" type="password" style="width:200px" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width:240px;margin-left:-75px;" @click="confirm">确认修改</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import { updatePwd } from '@/api/user';
import Veri from '@/components/Veri';
export default {
  components: {
    Veri
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user.userName = localStorage.getItem('userName');
    console.log(this.user.userName);
  },
  methods: {
    confirm() {
      if (!this.user.phone) {
        this.$message.error('请输入手机号');
        return;
      }
      if (!this.user.code) {
        this.$message.error('请输入验证码');
        return;
      }
      if (!this.user.password) {
        this.$message.error('请输入新的密码');
        return;
      }
      if (this.user.password.length < 8) {
        this.$message.error('请输入不少于8位字符的字母+数字组合');
        return;
      }
      if (this.user.password.length > 25) {
        this.$message.error('请输入不多于25位字符的字母+数字组合');
        return;
      }
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,25}$/.test(this.user.password)
      ) {
        this.$message.error('密码应是8-25位之间的字母加数字');
        return;
      }
      let form = {
        phone: this.user.phone,
        code: this.user.code,
        password: this.$md5(this.user.password)
      };
      updatePwd(form).then(res => {
        const data = res.data;
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '重置成功'
          });
          this.$store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        } else {
          this.$message.error(data.message);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.secreate {
  padding-top: 100px;
  width: 70vw;
  margin: 0 auto;
}
.el-input {
  width: 20vw;
  margin: 0 auto;
}
</style>
