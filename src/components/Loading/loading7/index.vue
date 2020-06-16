<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
        <div class="loading-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading7',
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
    perspective: 120px;
  }

  .loading-item {
    width: 4em;
    height: 4em;
    background-color: #fc2f70;
    transform: rotate(0);
    animation: flip 1s infinite;
  }

  @keyframes flip {
    50% {
      transform: rotateY(180deg);
    }

    100% {
      transform: rotateY(180deg) rotateX(180deg);
    }
  }

</style>
