<!--
 * @Author: wang_yechao
 * @Date: 2020-05-31 08:15:00
-->
<template>
  <div>
    <label for="upload-button" class="el-icon-upload  el-button el-button--primary">上传</label>
    <input type="file" id="upload-button" @change="handleUpload" class="upload-button" multiple>
    <!-- multiple -->
    <el-table :data="tableData">
      <el-table-column label="文件名字" prop="name"></el-table-column>
      <el-table-column>
        <template v-slot="{row}">
          <el-progress :percentage="row.percent"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="上传时间">
        <template v-slot="{row}">
          {{row.time|timeFormatter('{y}-{m}-{d} {h}:{i}:{s}')}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="上传进度">
        <template v-slot="{row}">
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import {
  uploadFile,
  mergeFile
} from '@/api/upload'
import SparkMD5 from 'spark-md5'
export default {
  name: 'UploadFile',
  data () {
    return {
      tableData: [],
      currentChunk: 0,
      chunkSize: 100, // 每个chunk的大小
      chunks: 100, // 分成的chunk数量
      files: {},
      currentHash: ''// 当前hash
    }
  },
  created () {},
  methods: {
    handleMergeFile (data) {
      mergeFile(data).then(res => {
        console.log(res, '合并切片')
      })
    },
    handleClick () {
      return false
    },
    handleUpload (e) {
      const files = e.target.files[0] // 单个
      console.log(files, 'files')
      let fileReader = new FileReader()
      if (files.size > 1024 * 1024 * 1204) {
        this.chunks = 100 // 分成的chunk数量
      } else {
        this.chunks = 3
      }
      this.chunkSize = files.size / this.chunks // 每个chunk的大小
      this.uploadFun(this.handleFileChunk(fileReader, files))
      this.currentChunk++

      fileReader.onload = (e) => {
        if (this.currentChunk < this.chunks) {
          console.log(this.currentChunk, 'curChunk')
          this.uploadFun(this.handleFileChunk(fileReader, files))
          this.currentChunk++
        } else {
          console.log(this.currentHash, 'this.currentHash')
          this.handleMergeFile({
            name: files.name,
            size: this.chunkSize,
            hash: this.currentHash
          })
          console.log(this.currentChunk, '上传完毕')
        }
      }
      fileReader.onerror = (err) => {
        console.warn(err, 'oops, something went wrong.')
      }
    },
    uploadFun ({
      formData,
      obj
    }) {
      uploadFile(formData, (e) => {
        obj.percent = (e.loaded / e.total * 100 | 0)
        // this.tableData
        this.tableData.push(obj)
        console.log(formData.percent, obj, this.tableData, 'complete')
      })
        .then((res) => {
          if (res.data.code === 200) {
            const {
              data
            } = res.data
            console.log(data)
            // this.percent = 0
            // this.tableData = data.result
          }
          // this.currentChunk = 0
        })
    },
    handleFileChunk (fileReader, files) {
      var spark = new SparkMD5.ArrayBuffer()
      let obj = Object.create(null)
      let formData = new FormData()
      let chunkFile = File.prototype.slice.call(files, this.currentChunk * this.chunkSize, this.chunkSize * (this
        .currentChunk + 1))
      let hash = spark.end()
      this.currentHash = hash
      var chunk = new File([chunkFile], hash + '##' + this.currentChunk)
      fileReader.readAsArrayBuffer(chunkFile)
      formData.append('file', chunk)
      // formData.append('filename', files.name)
      formData.append('total', this.chunks)
      formData.append('index', this.currentChunk)
      console.info('computed hash', hash)
      obj.file = chunk
      obj.name = hash + '##' + this.currentChunk
      obj.total = this.chunks
      obj.index = this.currentChunk
      obj.time = +new Date()
      return {
        formData,
        obj
      }
    }

  }
}

</script>

<style scoped lang="scss">
  .upload-button {
    position: absolute;
    clip: rect(0, 0, 0, 0)
  }

</style>
