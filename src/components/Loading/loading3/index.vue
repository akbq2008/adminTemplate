<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
        <div class="coin"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading3',
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

  .loading .coin {
    width: 4em;
    height: 4em;
    border-radius: 50%;
    border: 4px solid #3cefff;
    animation: spin 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotateY(540deg);
    }
  }

</style>
