<!--
 * @Author: wang_yechao
 * @Date: 2020-02-29 14:42:14
 -->

## 案例

```
<template>
  <div>
     <Tinymce ref="editor" :height="400" v-model="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index'
export default {
  components: {
    Tinymce
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>

```