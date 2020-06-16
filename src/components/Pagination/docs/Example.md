<!--
 * @Author: wang_yechao
 * @Date: 2020-02-29 14:42:14
 -->

## 案例

```
<template>
  <div>
     <Address :selectedData="selectedData"></Address>
  </div>
</template>

<script>
import Address from '@/components/Address/index'
export default {
  components: {
    Address
  },
  data () {
    return {
      selectedData: {}
    }
  }
}
</script>

<style scoped>

</style>

```
