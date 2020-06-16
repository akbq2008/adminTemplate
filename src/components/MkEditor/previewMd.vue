<!--
 * @Author: wang_yechao
 * @Date: 2020-02-26 22:58:09
 -->
<template>
  <div>
    <markdown-it-vue class="md-body" :content="content" />
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  name: 'previewMd',
  props: {
    content: {
      type: String,
      default: '# hello world'
    }
  },
  components: {
    MarkdownItVue
  }
}

</script>
<style>
  .markdown-body .highlight pre,
  .markdown-body pre {
    background-color: #272822;
  }

</style>
