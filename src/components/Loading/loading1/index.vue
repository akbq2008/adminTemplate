<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
        <span class="loading-item"></span>
        <span class="loading-item"></span>
        <span class="loading-item"></span>
        <span class="loading-item"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading1',
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
    background-color: #fff;
    opacity: .4;
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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .loading-item {
    width: 1em;
    height: 4em;
    margin: 0 5px;
    background-color: #3cefff;
  }

  .loading-item:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  .loading-item:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  .loading-item:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  .loading-item:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }

  @keyframes grow {

    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }

</style>
