<template>
<el-dialog
	:title="dialogTitle"
	:visible="dialogFormVisible"
	:close-on-click-modal="showModal"
	:style="dialogStyle"
	@close="close"
>
	<el-form :label-width="width">
		<slot></slot>
		<el-form-item v-if="showBtn" class="cr">
			<el-button @click="close">取消</el-button>
			<el-button type="primary" @click="save">确定</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</template>

<script>
export default {
  props: {
    // 是否可以通过点击 modal 关闭 Dialog，设置为false或者没有的时候有bug，
    // https://github.com/ElemeFE/element/issues/16887#issuecomment-518063373
    showModal: {
      type: Boolean,
      default: true
    },
    // 是否显示确定和取消
    showBtn: {
      type: Boolean,
      default: true
    },
    dialogStyle: {
      type: Object,
      default: () => {
        return {
          width: '200px;'
        };
      }
    },
    width: {
      type: String,
      default: '80px'
    },
    dialogTitle: {
      type: String,
      default: '标题'
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    save() {
      this.$emit('saveDialog');
    },
    close() {
      this.$emit('closeDialog', false);
    }
  }
};
</script>

<style scoped>
</style>
