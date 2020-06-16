<!--
 * @Author: wang_yechao
 * @Date: 2020-01-27 14:27:28
 -->
<template>
  <div class="code ma-15">
    <div class="code-item pt-15">
      <div class="code-header pointer" :style="{backgroundImage:`url(${item.pic_url}`}" @click="preview(item.pic_url)">
        <span class="code-tag" v-if="item.name">{{item.name}}</span>
      </div>
      <div class="code-content fx-sa">
        <el-button type="danger" class="el-icon-view" @click="handleViweCode(item.id)">查看代码</el-button>
       <el-tag>创建时间:{{item.create_at|timeFormatter('{y}-{m}-{d} {h}:{i}:{s}')}}</el-tag>
      </div>
    </div>
    <overLay :isVideo="false" :src="currentFile" @close="closeOverLay" :isShow="isShow"></overLay>
  </div>
</template>

<script>
import overLay from '@/components/Upload/overLay'
export default {
  name: 'MkEditroList',
  components: {
    overLay
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShow: false,
      currentFile: ''
    }
  },
  methods: {
    closeOverLay () {
      this.isShow = false
    },
    preview (url) {
      this.currentFile = url
      this.isShow = true
    },
    handleViweCode (id) {
      this.$router.push(`/editor?id=${id}`)
    }
  }
}

</script>

<style scoped lang="scss">
  .code {
    &-header {
      background-size: 100% 100%;
      text-align: right;
      position: relative;
      height: 300px;
      border: 1px solid #ddd;
    }

    &-tag {
      background-color: #ff0;
      padding: 5px 10px;
      display: inline-block;
      color: #999;
    }

    &-content {
      border: 1px solid #ddd;
      border-top: none;
      height: 60px;
    }
    &-left {
      &>li {
        line-height: 40px;
      }

      border: 1px solid #ddd;
    }
  }

</style>
