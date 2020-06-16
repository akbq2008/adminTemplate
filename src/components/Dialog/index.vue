<!--
 * @Author: wang_yechao
 * @Date: 2020-03-23 15:55:35
 -->
<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="modal" :width="width" @close="close">
    <slot />
    <div v-if="showBtn" class="text-center pt-15">
      <template v-if="order==='left'">
        <el-button type="primary" @click="save">{{saveTxt}}</el-button>
        <el-button type="danger" @click="close">{{cancleTxt}}</el-button>
      </template>
      <template v-else>
        <el-button type="danger" @click="close">{{cancleTxt}}</el-button>
        <el-button type="primary" @click="save">{{saveTxt}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 是否可以通过点击 modal 关闭 Dialog，设置为false或者没有的时候有bug，
    // https://github.com/ElemeFE/element/issues/16887#issuecomment-518063373
    modal: {
      type: Boolean,
      default: false
    },
    // 是否显示确定和取消
    showBtn: {
      type: Boolean,
      default: true
    },
    // dialog标题
    title: {
      type: String,
      default: '标题'
    },
    // dialog是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // dialog宽度
    width: {
      type: String,
      default: ''
    },
    // 取消按钮文案
    cancleTxt: {
      type: String,
      default: '取消'
    },
    // 确定按钮文案
    saveTxt: {
      type: String,
      default: '确定'
    },
    // 按钮顺序
    order: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    save () {
      this.$emit('save')
    },
    close () {
      this.$emit('close', false)
    }
  }
}

</script>

<style scoped>
</style>
