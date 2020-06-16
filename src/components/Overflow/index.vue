<!--
 * @Author: wang_yechao
 * @Date: 2020-03-23 22:56:50
 -->
<template>
  <div :class="[row?'multi':'overflow']" :style="currentStyle">
    {{content}}
  </div>
</template>

<script>
export default {
  name: 'overflow',
  props: {
    //   单行模式时候的内容宽度
    width: {
      type: Number
    },
    // 内容
    content: {
      type: String,
      default: 'content'
    },
    // 是否是多行模式，行数
    row: {
      type: Number
    }
  },

  data () {
    return {
      msg: 'heelo ew'
    }
  },
  computed: {
    currentStyle () {
      return this.row > 0 ? `-webkit-line-clamp:${this.row}` : `width:${this.width}px`
    }
  }
}

</script>

<style scoped>
  .multi {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
