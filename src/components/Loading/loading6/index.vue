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
        <div class="loading-item"></div>
        <div class="loading-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading6',
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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .loading-item {
    width: 2em;
    height: 2em;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #fc2f70;
    animation: fade 0.8s ease-in-out alternate infinite;
  }

  .loading-item:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  .loading-item:nth-of-type(2) {
    animation-delay: -0.2s;
  }

  @keyframes fade {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

</style>
