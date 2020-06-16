<!--
 * @Author: wang_yechao
 * @Date: 2020-04-15 14:18:17
 -->
<template>
  <div class="inline-block">
    <el-select class="w-206 mr-10" v-model="selectedData.currentProvince" filterable placeholder="请选择省份"
      @change="selectProvince" :disabled="disabled">
      <el-option v-for="(item,index) in provincesData" :key="index" :value="item.id" :label="item.name" />
    </el-select>
    <el-select class="w-206 mr-10" v-model="selectedData.currentCity" filterable placeholder="请选择市" @change="selectCity"
      :disabled="disabled">
      <el-option v-for="(item,index) in citysData" :key="index" :value="item.id" :label="item.name">{{ item.name }}
      </el-option>
    </el-select>
    <el-select class="w-206 mr-10" v-if="showArea" v-model="currentArea" filterable placeholder="请选择区"
      @change="selectArea" :disabled="disabled">
      <el-option v-for="(item,index) in areasData" :key="index" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>

<script>
import {
  provinces,
  citys,
  areas
} from '@/components/address/city.js'
export default {
  props: {
    // 当前选中的参数
    selectedData: {
      type: Object,
      default: () => {
        return {
          currentProvince: ''
        }
      }
    },
    // 是否展示区域
    showArea: {
      type: Boolean,
      default: true
    },
    // 重置数据
    resetData: {
      type: Boolean,
      default: false
    },
    // 是否禁止选中
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      currentArea: '', // 这里不能用selected.currentArea,区域选中后，能获取值，但是select没选中
      provincesData: [], // 省
      citysData: [], // 城市,
      areasData: [] // 区域
    }
  },
  watch: {
    resetData (val, old) {
      if (val) {
        // 如果点击取消的话，就初始化
        this.selectedData = {}
        this.currentArea = ''
        this.citysData = []
        this.areasData = []
      }
    }
  },
  created () {
    this.provincesData = provinces
  },
  mounted () {
    // 如果有选中省的话
    if (this.selectedData.currentProvince) {
      this.handleInitData()
    }
  },
  methods: {
    /**
       * @description: 有初始值的话，选中对应的省市区
       * @param {type}
       * @return:
       */
    handleInitData () {
      this.provincesData.forEach(province => {
        if (province.name === this.selectedData.currentProvince || province.id === +this.selectedData
          .currentProvince) {
          this.citysData = citys[province.id]
        }
      })
      if (this.selectedData.currentCity) {
        this.citysData.forEach((city) => {
          if (city.name === this.selectedData.currentCity || city.id === +this.selectedData.currentCity) {
            this.areasData = areas[city.id]
          }
        })
      }
      if (this.selectedData.currentArea) {
        this.currentArea = this.selectedData.currentArea
      }
    },
    /**
       * @description: 选中的省，并赋值对应的城市
       * @param {type} val:选中的省的id
       * @return:
       */
    selectProvince (val) {
      this.$emit('currentSelected', {})
      this.selectedData.currentCity = '' // 城市重置
      this.currentArea = '' // 区域重置,不能用selected.Data
      this.areasData = [] // 区域重置
      this.provincesData.forEach((v, i) => {
        if (v.id === val) {
          this.selectedData.provinceName = this.provincesData[i].name
        }
      })
      this.selectedData.cityName = ''
      this.selectedData.areaName = ''
      this.citysData = citys[val]
      this.$emit('currentSelected', this.selectedData)
      console.log('当前选中的省:' + this.selectedData.provinceName)
    },
    /**
       * @description: 选中的市，并赋值对应的区域
       * @param {type} val:选中的市的id
       * @return:
       */
    selectCity (val) {
      this.currentArea = ''
      this.citysData.forEach((v, i) => {
        if (v.id === val) {
          this.selectedData.cityName = v.name
        }
      })
      // 选择了一次地址后，再次选择会导致省的名字为空
      if (!this.selectedData.provinceName) {
        const str = val.substring(0, 2) + '0000'
        this.provincesData.forEach((v, i) => {
          if (v.id === str) {
            this.selectedData.provinceName = this.provincesData[i].name
          }
        })
      }
      if (!this.showArea) {
        this.$emit('currentSelected', this.selectedData)
        console.log('当前选中的省市:' + this.selectedData)
      }
      this.areasData = areas[val]
      this.$emit('currentSelected', this.selectedData)
    },
    /**
       * @description: 选中的区域
       * @param {type} val:选中的区域Id
       * @return:
       */
    selectArea (val) {
      this.areasData.forEach((v, i) => {
        if (v.id === val) {
          this.selectedData.areaName = this.areasData[i].name
        }
      })
      this.selectedData.currentArea = this.currentArea
      this.$emit('currentSelected', this.selectedData)
      console.log('当前选中的省市区:', this.selectedData)
    }
  }
}

</script>

<style scoped>
  .w-206 {
    width: 206px;
  }

</style>
