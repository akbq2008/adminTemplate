<template>
  <div class="video">
    <div class="video-overlay" :class="{ hide: !isShow }" @click="handleClose" />
    <div class="video-dialog" :class="{ hide: !isShow }">
      <div class="video-dialog__wrap">
        <div class="video-dialog__wrap-btn" @click="handleClose">
          <a href="javascript:void(0)" title="关闭窗口">
            <img src="@/components/Upload/images/close_white.png" class="video-dialog__wrap-btn-close">
          </a>
        </div>
        <img v-if="!isVideo" :src="src" alt class="video-content">
        <div v-else>
          <video v-if="isVideoAlive" :src="src" width height class="video-content" controls="controls">Your browser does
            not
            support the video tag.</video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVideo: {
      type: Boolean,
      default: false
    },
    isVideoAlive: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}

</script>

<style scoped lang="scss">
  .video {
    &-content {
      max-width: 1200px;
      max-height: 583px;
      width: auto;
      height: auto;
    }

    &-dialog__wrap {
      padding-top: 40px;
      max-height: 583px;
      text-align: center;
      display: block;
      margin: 0px;

      &-btn {
        position: absolute;
        top: 12px;
        right: -30px;

        &-close {
          width: 32px;
          height: 32px;
        }
      }
    }

    &-overlay {
      background: #000 !important;
      opacity: 0.8 !important;
      filter: alpha(opacity=80) !important;
      margin: 0px;
      padding: 0px;
      border: none;
      width: 100%;
      height: 100%;
      background: rgb(51, 51, 51);
      opacity: 0.6;
      z-index: 1002;
      position: fixed;
      top: 0px;
      left: 0px;
    }

    &-dialog {
      padding: 0px;
      border: none;
      z-index: 1002;
      top: 50%;
      left: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
    }

    .hide {
      display: none !important;
    }
  }

</style>
