<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
        <svg viewBox="0 0 50 50">
          <circle class="ring" cx="25" cy="25" r="20"></circle>
          <circle class="ball" cx="25" cy="5" r="4.5"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading11',
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

  .loading svg {
    width: 5.75em;
    animation: 1.5s spin ease infinite;
  }

  .loading .ring {
    fill: none;
    stroke: hsla(341, 97%, 59%, 0.3);
    stroke-width: 2;
  }

  .loading .ball {
    fill: #fc2f70;
    stroke: none;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

</style>
