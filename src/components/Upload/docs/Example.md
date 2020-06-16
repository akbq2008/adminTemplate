<!--
 * @Author: wang_yechao
 * @Date: 2020-02-29 14:42:14
 -->

## 案例

```
<template>
  <div>
    <uploadImg @change="handleUpload" :data="pic_url"></uploadImg>
  </div>
</template>

<script>
import uploadImg from '@/components/Upload/uploadImg'
export default {
  components: {
    uploadImg
  },
  data () {
    return {
      pic_url: []
    }
  },
  methods: {
     handleUpload (data) {
      this.pic_url = data
    },
  }
}

</script>

<style scoped>

</style>

```
