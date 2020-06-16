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
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading8',
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
  .loading-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }

  .loading {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
  }

  .loading-item {
    width: 1em;
    height: 1em;
    margin: .5em;
    background-color: #3cefff;
    border-radius: 50%;
    animation: fade 1.5s alternate ease-in-out infinite;
  }

  .loading-item:nth-of-type(2),
  .loading-item:nth-of-type(4) {
    animation-delay: 0.25s;
  }

  .loading-item:nth-of-type(3),
  .loading-item:nth-of-type(5),
  .loading-item:nth-of-type(7) {
    animation-delay: 0.5s;
  }

  .loading-item:nth-of-type(6),
  .loading-item:nth-of-type(8) {
    animation-delay: 0.75s;
  }

  .loading-item:nth-of-type(9) {
    animation-delay: 1s;
  }

  @keyframes fade {
    to {
      opacity: 0.2;
    }
  }

</style>
