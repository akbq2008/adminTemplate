<template>
  <div class="inline-block">
    <el-select
      v-model="selectedData.currentProvince"
      filterable
      placeholder="请选择"
      @change="selectProvince"
    >
      <el-option
        v-for="(item,index) in provincesData"
        :key="index"
        :value="item.id"
        :label="item.name"
      />
    </el-select>
    <el-select v-model="selectedData.currentCity" filterable placeholder="请选择" @change="selectCity">
      <el-option
        v-for="(item,index) in citysData"
        :key="index"
        :value="item.id"
        :label="item.name"
      >{{ item.name }}</el-option>
    </el-select>
    <el-select
      v-if="showArea"
      v-model="currentArea"
      filterable
      placeholder="请选择"
      @change="selectArea"
    >
      <el-option
        v-for="(item,index) in areasData"
        :key="index"
        :value="item.id"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script>
import { provinces, citys, areas } from './city'
export default {
  // model: {},
  props: {
    selectedData: {
      type: Object,
      default: () => {}
    },
    showArea: {
      type: Boolean,
      default: true
    },
    /**
     * 重置表单，
     * this.resetData = true;
     *     setTimeout(() => {
     *    this.resetData = false;
     * }, 20);
     *
     *  */
    resetData: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentArea: '', // 这里不能用selected.currentArea,区域选中后，能获取值，但是select没选中
      provincesData: [], // 省
      citysData: [], // 城市,
      areasData: [] // 区域
      // selectedData: {}
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
    if (this.selectedData.currentProvince) {
      this.citysData = citys[this.selectedData.currentProvince]
    }
  },
  methods: {
    selectProvince (val) {
      this.selectedData.currentCity = '' // 城市重置
      this.currentArea = '' // 区域重置,不能用selected.Data
      this.areasData = [] // 区域重置
      this.provincesData.forEach((v, i) => {
        if (v.id === val) {
          this.selectedData.provinceName = this.provincesData[i].name
        }
      })
      this.citysData = citys[val]
    },
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
      }
      this.areasData = areas[val]
    },
    selectArea (val) {
      this.areasData.forEach((v, i) => {
        if (v.id === val) {
          this.selectedData.areaName = this.areasData[i].name
        }
      })
      this.selectedData.currentArea = this.currentArea
      this.$emit('currentSelected', this.selectedData)
    }
  }
}
</script>

<style scoped>
</style>
