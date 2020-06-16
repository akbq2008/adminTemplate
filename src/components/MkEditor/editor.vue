<!--
 * @Author: wang_yechao
 * @Date: 2020-02-21 15:42:20
 -->
<template>
  <div>
    <header>
      <el-row>
        <el-col :span="4" style="padding-top:5px;">
          <div class="pl-15">
            <el-button type="primary" size="small" @click="runCode('')">运行</el-button>
            <el-button type="primary" size="small" @click="runCode('src/components/MkEditor/normal.vue')">重置</el-button>
          </div>
        </el-col>
        <el-col :span="10">
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeFie">
            <el-tab-pane v-for="(item,index) in editableTabs" :key="index" :label="item.label" :name="index.toString()">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </header>
    <div class="code">
      <el-row>
        <el-col :span="4">
          <div class="code-file">
            <el-tree :data="treeData" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id"
              :default-expanded-key="[1]">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="relative">
            <div class="code-content" ref="codePre">
              <hamburger :isActive="isActive" @toggleClick="toggleClick" style="display:none"></hamburger>
              <div class="code-button__box">
                <span @click="handleFull">
                  <ScreenFull fill="#f8f8f2" class="code-copy__item code-copy__full"></ScreenFull>
                </span>
                <img
                  :src="downloadBtnActive?require('@/assets/images/icon_download__active@48px.png'):require('@/assets/images/icon_download__normal@48px.png')"
                  alt="" class="code-copy__item code-copy__download" @mouseover.stop="handleDownLoadOver"
                  @mouseout.stop="handleDownEnd" @click="handleDownload">
                <img
                  :src="copyBtnActive?require('@/assets/images/icon_copy__active@48px.png'):require('@/assets/images/icon_copy__normal@48px.png')"
                  alt="" class="code-copy__item code-copy__button" v-clipboard="copyData" @mouseover.stop="handleCopy"
                  @mouseout.stop="handleCopyEnd" @click="handleCopyCode" @success="handleSuccess" @error="handleError">
              </div>
              <pre v-highlightjs="currentCode" v-cloak>
                  <code  id="code-box" ref="code" class="hljs">
                  </code>
              </pre>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="code-preview">
            <div class="code-preview__page">
              <previewMd v-if="currentFile.indexOf('.md')>-1" :content="currentCode"></previewMd>
              <preivew v-else></preivew>
            </div>
            <!-- <div class="line"></div> -->
            <!-- <div class="code-preview__console"></div> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import ScreenFull from '@/components/ScreenFull/index'
import preivew from '@/components/MkEditor/preview'
import previewMd from '@/components/MkEditor/previewMd'
import Loading from '@/components/Loading/loading1/index'
import hamburger from '@/components/Hamburger/index'
import hljs from 'highlight.js'
import '@static/highlights/highlightjs-line-numbers.min.js'
import 'highlight.js/styles/monokai-sublime.css'
// import 'vue-clipboards'
import {
  getFile,
  runFile
} from '@/api/file'
window.hljs = hljs
let renderTime = 0 // 根据渲染次数来防止directives中再次渲染，不然mouseove和mouseout会触发重新渲染，导致代码有问题
export default {
  name: 'Editor',
  components: {
    hamburger,
    Loading,
    preivew,
    previewMd,
    ScreenFull
  },
  directives: {
    highlightjs: (el, binding) => {
      var targets = [...el.querySelectorAll('.code-content code')]
      if (renderTime < 3) {
        try {
          for (let index = 0; index < targets.length; index++) {
            const block = targets[index]
            if (!binding.value) {
              continue
            }
            if (typeof binding.value === 'string') {
              block.style.fontSize = '16px'
              block.style.lineHeight = 1.5
              block.textContent = binding.value
              hljs.highlightBlock(block)
              hljs.initLineNumbersOnLoad()
            }
          }
        } catch (error) {
          console.log(error, 'error')
        }
      }
      renderTime++
    }
  },
  data () {
    return {
      isPreviewing: false, // 是否正在预览查看效果
      copyData: '', // 复制数据
      copyBtnActive: false, // 复制按钮
      downloadBtnActive: false, // 下载按钮
      hasCopied: false,
      treeData: [], // 树形节点数组
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isActive: false,
      currentCode: '', // 当前选中的code
      currentFile: '', // 当前选中的文件
      loading: false,
      renderTime: 0, // 渲染次数，不超过3次，超过3次会导致渲染异常出Bug
      editableTabs: [], // tabs数组
      editableTabsValue: '',
      configFile: [{
        key: 'JavaScript',
        label: 'Js'
      }, {
        key: 'Css',
        label: 'Css'
      }, {
        key: 'Html',
        label: 'Html'
      }, {
        key: 'Readme',
        label: 'Readme'
      }],
      element: {}
    }
  },
  watch: {
    $route (now, old) {
      if (now !== old) {
        this.runCode('src/components/MkEditor/normal.vue')
      }
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    handleSuccess (e) {
      // console.log(e)
    },
    handleError (e) {
      // console.log(e)
    },
    handleFull () {
      // this.element = this.$refs.codePre
      this.element = document.querySelector('.code-content')
      // console.log(this.element, 'this.element')
    },
    removeTab () {

    },
    /**
       * @description: 运行文件
       * @param {type} 当前文件名字
       * @return:
       */
    runCode (name) {
      if (this.currentFile.indexOf('.md') > -1) {
        this.getCode() // 更新md 文件
        return
      }
      let formData = {
        file: name || this.currentFile
      }
      runFile(formData).then(res => {})
    },
    handleDownLoadOver () {
      renderTime = 3
      this.downloadBtnActive = true
    },
    handleDownEnd () {
      renderTime = 3
      this.downloadBtnActive = false
    },
    handleCopyEnd () {
      renderTime = 3
      this.copyBtnActive = false
    },
    handleCopy () {
      renderTime = 3
      this.copyBtnActive = true
    },
    toggleClick () {
      this.isActive = !this.isActive
    },
    /**
       * @description: el-tabs点击切换文件
       * @param {type}
       * @return:
       */
    changeFie (data) {
      const obj = this.editableTabs[data.index]
      for (let key in obj) {
        this.configFile.forEach(v => {
          if (v.label.includes(key)) {
            this.currentFile = obj.path
            this.currentCode = obj[key]
            renderTime = 0
          }
        })
      }
    },
    /**
       * @description: 树形文件点击
       * @param {type}
       * @return:
       */
    handleNodeClick (data) {
      let val = ''
      for (let key in data) {
        if (key === 'content' && typeof (data[key]) !== 'object') {
          this.currentCode = data[key]
          val = data['path']
        }
      }
      this.editableTabs.forEach((item, index) => {
        if (val === item.path) {
          this.editableTabsValue = index.toString()
        }
      })
      // tabs与tree相关联
      if (typeof (this.currentCode) === 'string' && data['path']) {
        this.copyData = this.currentCode
        this.currentFile = data['path']
        renderTime = 0
      }
      //  else {
      //   this.currentFile = this.editableTabs[this.editableTabsValue].label
      // }
    },
    getCode () {
      this.loading = true
      let formData = {
        id: this.$route.query.id
      }
      getFile(formData).then(res => {
        return new Promise((resolve, reject) => {
          const {
            data
          } = res.data
          var id = 1
          /**
             * @description:
             * @param {type} key 数组中的键 label数组具体对象的key
             * @return:
             */
          this.treeData = []
          const ConfigFun = (key, label) => {
            if (data[key].length > 0) {
              this.treeData.push({
                id: id++,
                label: label,
                children: data[key]
              })
              this.currentCode = data[key][0][label]
              this.currentFile = data[key][0].path

              data[key].forEach(v => {
                v.content = v[label]
              })
              this.editableTabs.push(...data[key])
            }
          }
          this.configFile.forEach(v => {
            ConfigFun(v.key, v.label)
          })
          this.editableTabs.forEach((item, index) => {
            if (item.label === 'Readme.md') {
              this.editableTabsValue = index.toString()
            }
          })
          renderTime = 0
          this.copyData = this.currentCode
          this.loading = false
          resolve()
        })
      })
    },
    handleCopyCode () {
      this.$message.success('复制成功')
    },
    handleDownload () {
      window.open(`http://192.168.31.9:7001/api/download?fileUrl=${this.currentFile}`)
    }
  }
}

</script>

<style scoped lang="scss">
  header {
    border-bottom: 1px solid #ddd;
  }

  .code {
    &-file {
      height: calc(100vh - 60px);
      background-color: #fff;
    }

    &-content {
      height: calc(100vh - 60px);
      overflow: auto;
      // background-color: aqua;
      border: 1px solid #ddd;
    }

    &-previe {
      height: calc(100vh - 60px);
      background-color: aliceblue;
    }

    &-copy__item {
      position: sticky;
      top: 13px;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }

    &-copy__full {
      left: 85%;
    }

    &-copy__download {
      left: 90%;
    }

    &-copy__button {
      left: 95%;
    }

    &-button__box {
      position: absolute;
      width: 100%;
      right: 15px;
      height: auto;
    }

    &-preview {
      &__page {
        padding: 15px;
        overflow: auto;
        max-height: calc(100vh - 86px);
      }

      &__console {
        height: 20vh;
      }
    }
  }

  pre {
    margin: 0;
    min-height: 100%;
    background-color: #272822;
  }

  /deep/ td.hljs-ln-numbers {
    text-align: center;
    color: #ccc;
    border-right: 1px solid #999;
    vertical-align: top;
    padding-right: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /deep/ td.hljs-ln-code {
    padding-left: 10px;
  }

  /deep/ code {
    white-space: pre-wrap;
    overflow: auto;
    margin-top: -14px;
  }

  /deep/ .hljs-ln tr {
    font-size: 16px;
    line-height: 1.5;
  }

  /*滚动条整体部分,必须要设置*/

  body *::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background-color: #e1e5e9;
    border-radius: 4px;
  }

  /*滚动条的轨道*/

  body *::-webkit-scrollbar-track {
    background-color: #e1e5e9;
    border-radius: 10px;
  }

  /*滚动条的滑块按钮*/

  body *::-webkit-scrollbar-thumb {
    border-radius: 4px;
    width: 6px;
    background-color: #5daff1;
  }

  如果两端不要按钮的话，则不需要以下的
  /*滚动条的上下两端的按钮*/

  body *::-webkit-scrollbar-button {
    height: 0;
    background-color: rgba(0, 0, 0, 0);
  }

</style>
