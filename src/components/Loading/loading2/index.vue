<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading2',
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
    width: 4em;
    height: 4em;
    border: 3px solid #3cefff;
    overflow: hidden;
    animation: spin 3s ease infinite;
  }

  .loading::before {
    content: '';
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: hsla(185, 100%, 62%, 0.75);
    transform-origin: center bottom;
    transform: scaleY(1);
    animation: fill 3s linear infinite;
  }

  @keyframes spin {

    50%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes fill {

    25%,
    50% {
      transform: scaleY(0);
    }

    100% {
      transform: scaleY(1);
    }
  }

</style>
