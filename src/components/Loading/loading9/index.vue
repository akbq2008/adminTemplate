<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
        <div class="outer"></div>
        <div class="middle"></div>
        <div class="inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading9',
  props: {
    // 状态
    loading: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style scoped>
 .loading-shadow {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, .7);
    z-index: 10;
  }

  .loading-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }

  .loading {
    position: relative;
  }

  .loading .outer,
  .loading .middle,
  .loading .inner {
    border: 4px solid transparent;
    border-top-color: #3cefff;
    border-right-color: #3cefff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .loading .outer {
    width: 4em;
    height: 4em;
    margin-left: -2em;
    margin-top: -2em;
    animation: spin 2s linear infinite;
  }

  .loading .middle {
    width: 2.5em;
    height: 2.5em;
    margin-left: -1.25em;
    margin-top: -1.25em;
    animation: spin 1.75s linear reverse infinite;
  }

  .loading .inner {
    width: 0.6em;
    height: 0.6em;
    margin-left: -0.3em;
    margin-top: -0.3em;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

</style>
