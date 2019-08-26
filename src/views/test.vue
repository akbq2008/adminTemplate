<template>
<div class="bg_wt">
	<h1>地址级联</h1>
	<tuAddress :selectedData="selectedData" :showArea="true" @currentSelected="currentSelected" />
	<h1>dialog框</h1>
	<div class="mt_20">
		<el-button type="primary" @click="handleDialog">点击</el-button>
	</div>
	<Dialog
		:showBtn="true"
		width="120px"
		dialogTitle="彪子"
		:dialogFormVisible="dialogFormVisible"
		:showModal="false"
		:dialogStyle="dialogStyle"
		@saveDialog="saveDialog"
		@closeDialog="closeDialog"
	>
		<el-form-item label="姓名">
			<el-input v-model="userName" clearable />
		</el-form-item>
	</Dialog>
	<div class="mt_20">
		<h1>上传组件</h1>
		<UploadImg
			:imgUrl="imgUrl"
			:canEdit="true"
			:limitNum="2"
			:limitSize="2"
			:imgStyle="imgStyle"
			info="你要限制什么？"
			content="要替换？"
			@uploadSuccess="uploadSuccess"
		/>
	</div>
	<div style="margin-top:40px;">
		<div class="fx">
			<el-input v-model="phone" style="width:200px" class="mr_20" />
			<Veri :phone="phone" />
		</div>
	</div>
</div>
</template>

<script>
import tuAddress from '@/components/Address/index';
import Dialog from '@/components/Dialog/index';
import Veri from '@/components/Veri/index';
import UploadImg from '@/components/UploadComponent/UploadImg';
export default {
  components: {
    tuAddress,
    Dialog,
    UploadImg,
    Veri
  },
  data() {
    return {
      selectedData: {
        currentProvince: '',
        currentCity: ''
      },
      dialogFormVisible: false,
      userName: '',
      dialogStyle: {
        width: '1200px',
        margin: '0 auto'
      },
      imgUrl: '',
      imgStyle: {},
      phone: ''
    };
  },
  methods: {
    uploadSuccess() {},
    currentSelected(val) {
      console.log(val, 'vla');
    },
    handleDialog() {
      this.dialogFormVisible = true;
    },
    saveDialog() {
      this.dialogFormVisible = false;
      // 确定按钮的处理逻辑
    },
    closeDialog() {
      this.userName = '';
      this.dialogFormVisible = false;
      //   取消的处理逻辑
    }
  }
};
</script>

<style scoped>
</style>
