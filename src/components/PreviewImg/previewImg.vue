<!--
 * @Author: wang_yechao
 * @Date: 2020-03-12 09:21:41
 -->
<template>
  <div>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- 预览区域顶部的默认UI，可以修改 -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  与图片相关的操作 -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <!--将分享按钮去掉 -->
            <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe'
import defaultUi from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import {
  Loading
} from 'element-ui'
export default {
  name: 'PreviewImg',
  props: {
    // 当前打开的图片索引
    index: {
      type: Number,
      default: 0
    },
    // 图片集合:例如arr:[url,url]
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data: {
      handler (now, old) {
        if (now.length > 0) {
          this.handleGalleryInit()
        }
      },
      deep: true
    }
  },
  data () {
    return {
      galleryArr: [], // 图片集
      hasCache: false, // 是否有图片缓存
      cacheArr: {} // 缓存对象
    }
  },
  mounted () {
    if (this.data.length > 0) {
      this.handleGalleryInit()
    }
  },
  methods: {
    /**
       * @description: 缓存图片资源
       * @param {type}
       * @return:
       */
    handleCache (data) {
      const arr = []
      data.forEach(item => {
        arr.push(item.src ? item.src : item)
      })
      let str = arr.sort().toString()
      if (this.cacheArr.hasOwnProperty(str)) {
        this.galleryArr = this.cacheArr[str]
      } else {
        this.cacheArr[str] = data
      }
    },
    /**
       * @description: 图片合重新集初始化
       * @param {type}
       * @return:
       */
    handleGalleryInit () {
      this.handleData().then(() => {
        this.init()
      })
    },
    /**
       * @description: 处理图像数据
       * @param {type}
       * @return:
       */
    handleData () {
      return new Promise((resolve, reject) => {
        const arr = this.data.concat()
        // 有缓存拿缓存资源，没有的话就获取
        let loadingInstance = Loading.service({
          fullscreen: false
        })
        if (this.cacheArr.hasOwnProperty(arr.toString())) {
          this.handleCache(this.data)
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close()
          })
          resolve()
        } else {
          this.galleryArr = []
          this.data.map((pic, index) => {
            let img = new Image()
            img.src = pic
            img.onload = (res) => {
              let imgInfo = res.path[0]
              this.galleryArr.push({
                src: pic,
                w: imgInfo.width,
                h: imgInfo.height
              })
              if (index === this.data.length - 1) {
                // console.log(index, this.data.length - 1, 'data')
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close()
                })
                this.handleCache(this.galleryArr)
                resolve()
              }
            }
            img.onerror = (res) => {
              console.log(res, 'error')
              this.$message.error('图片加载失败')
              resolve()
            }
          })
        }
      })
    },
    /**
       * @description: gallery初始化
       * @param {type}
       * @return:
       */
    init () {
      var pswpElement = document.querySelectorAll('.pswp')[0]
      var options = {
        index: this.index // 选中的图片在图片集中的索引
      }
      var gallery = new PhotoSwipe(pswpElement, defaultUi, this.galleryArr, options)
      gallery.init()
    }
  }
}

</script>

<style scoped>

</style>
