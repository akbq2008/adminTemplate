<!--
 * @Author: wang_yechao
 * @Date: 2020-02-29 22:17:45
 -->
## 案例

```
<template>
  <div>
    <Dialog  :visible="visible" @close="handleClose">

    </Dialog>
    <el-button type="primary" @click="visible=true">打开</el-button>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog/index'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    emptyImgUrl () {}
  }
}

</script>

<style scoped>

</style>

```