<!--
 * @Author: wang_yechao
 * @Date: 2020-02-23 14:45:38
 -->
<template>
  <div v-show="loading">
    <div class="loading-shadow"></div>
    <div class="loading-box">
      <div class="loading">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading10',
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
    width: 5.5em;
    height: 5.5em;
    border: 3px solid transparent;
    border-top-color: #3cefff;
    border-bottom-color: #3cefff;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }

  .loading:before {
    content: '';
    display: block;
    margin: auto;
    width: 1.75em;
    height: 1.75em;
    border: 3px solid #3cefff;
    border-radius: 50%;
    animation: pulse 1s alternate ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    from {
      transform: scale(0.5);
    }

    to {
      transform: scale(1);
    }
  }

</style>
