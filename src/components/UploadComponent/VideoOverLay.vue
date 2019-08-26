<template>
<div id="videoBox">
	<div
		id="overlay"
		style="margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; background: rgb(51, 51, 51); opacity: 0.6; z-index: 1002; position: fixed; top: 0px; left: 0px;"
		:class="{ hide: !isShow }"
		@click="close"
	></div>
	<div id="dialog_box" class="dialog_box" :class="{ hide: !isShow }">
		<div id="provideo" class="videobox" style="display: block; margin: 0px;">
			<div id="closebuttom2" class="closebtn" style="right: 0" @click="close">
				<a href="javascript:void(0)" title="关闭窗口">
					<img src="/static/images/close_white.png" />
				</a>
			</div>
			<img v-if="!isVideo" :src="src" alt class="video" />
			<div v-else>
				<video
					:src="src"
					width
					v-if="isVideoAlive"
            height
					class="video"
					controls="controls"
				>Your browser does not support the video tag.</video>
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
    close() {
      // this.isVideoAlive = false;
      // setTimeout(() => {
      //   this.isVideoAlive = true;
      // }, 200);
      this.$emit('closeOverLay');
    }
  }
};
</script>

<style scoped lang="scss">
#videoBox {
  .closebtn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .video {
    max-width: 1200px;
    max-height: 583px;
    width: auto;
    height: auto;
  }
  .videobox {
    padding-top: 40px;
    width: 1200px;
    max-height: 583px;
    text-align: center;
  }
  .closebtn img {
    width: 32px;
  }
  #overlay {
    background: #000 !important;
    opacity: 0.8 !important;
    filter: alpha(opacity=80) !important;
  }
  .hide {
    display: none !important;
  }
  .dialog_box {
    padding: 0px;
    border: none;
    z-index: 1002;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
  }
}
</style>
