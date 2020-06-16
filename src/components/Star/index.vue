<!--
 * @Author: wang_yechao
 * @Date: 2019-05-28 15:58:37
 -->
<template>
  <div class="star">
    <div class="inline-block" @mouseleave="handleLeave">
      <span class="star-item star-active middle" v-for="active in STAR_ACTIVE" :key="active.id"
        @click="rate(active,'active')" @mouseover="handleOver(active,'active')">
        A
        <slot name="active">
          <!-- <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABzklEQVRYR+2VQU7CUBCGZyomICVKomUp7igb8ATCCdQb1BtwhB6BG4gn0BuIN6iblmVdUk3QUIRE7JjXprGQwnstCDGhSRfNm87/vf/NzEPY8oNb1ocdwP92YDyolFkN5Yo9O20treSA66gdJiwrlrZxgOFrpYEkPTJhQq9ZOOl100CkdmDoqF0EvAhEqSsrVnNjAKM39Yo8vI8KokTX+WPrISlEKgfcvmoD4umMGJEtl6yzPwUIzh0vAbAVL0RtALyTFdMQBYl1gAblo8k0W/smrAOwF8JXNC+LYxAGABl7SEY2M3nGov0+nyAWwHWqdQJiRXaYRHFRLAF9IGAjzpmFNbAuiGXiDHhpEcZVe1JHeN3B7QLXqWgA0m1S4SDeu5GVnj8tFz1cAPZjOgi+OPcIotSzk2+5HwT0VFCshohrQg4ELlRZW9VEkrL2kxXzXCQ2CQCJJAxjZMUUyi0UxAbT6OtgkAQgv/9ZjBs8QoNoPih69YZrrL+BsO1/I7Xmh5boFS3kwEwXEL2ABO18ZtwJd+g7NM1p4EHr95JaYxcM+1UdgTRA0nl97cMS6gTYKZRMnXdsQg6wHYqcZ1RM9B8hAN4uVlnfAewc2LoDP9CItCHd0WiHAAAAAElFTkSuQmCC"
            alt=""> -->
        </slot>
      </span>
      <span v-for="normal in STAR_NORMAL" :key="normal.id" @click="rate(normal,'normal')"
        @mouseover="handleOver(normal,'normal')" class="star-item star-normal middle">
        A
        <slot name="normal">
          <!-- <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABW0lEQVRYR+2VgU3DMBREXyagTACdoO0EwATQDegGHaEjdIPCBLABsAHdgE7QdgKqkxzJchP72ymKkGIpSpVc/13O/58rel5Vz/wMAv69A7euh35Ke6mrAy+O+LkPAffAhyN+AD5LRHRxQIR3jlS/JSJ7lQp4At4CtjnwnqugVICa7iYg07PxXwvQvj8CyxaiNfAKfFuFtDkwAibANLisdYWTCP/aAoewQJsAEauxrnIYI9gjIPfOnIn1wKVEtJJLcKoJm7o915TodKQEiEwpt8lldfgFUKdlYwmLgFIRSXLLFviq/eRLGfLlmi6FS/aAX0AdrNG0LGFnFqB1C1Tr11LQw5hqm0CAgmmfKeC6KXisQRTi/KO3fqf5VvRqKZrD0DId0VYH/FHcOWKNVx2tckgYCakPqYtOwcoR6B6d6wAnfHRZHdAXnh0kidqm/1gFpD6k+P0gYHCgdwdO87I2IY7twrEAAAAASUVORK5CYII="
            alt="" class="star-item star-normal middle"> -->
        </slot>
      </span>
    </div>
    <slot><span v-if="hidden" class="middle star-txt">{{STAR_ACTIVE}}{{text}}</span></slot>
  </div>
</template>

<script>
export default {
  name: 'star',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // 星星的总数
    total: {
      type: Number,
      default: 5
    },
    // 选中的星星数量
    value: {
      type: Number,
      default: 3
    },
    // 是否显示文本
    hidden: {
      type: Boolean,
      default: true
    },
    // 文本
    text: {
      type: String,
      default: '星'
    },
    // 是否只读
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否允许再次点击后清除
    allowClear: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    STAR_ACTIVE () {
      if (!isNaN(this.count)) {
        return Number(this.count)
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    STAR_NORMAL () {
      if (!isNaN(this.total) && !isNaN(this.count)) {
        return Number(this.total) - Number(this.count)
      }
    }
  },
  data () {
    return {
      count: this.value, // 当前数量
      tmp: 0, // 临时变量
      currentNum: this.value, // 当前值
      canHover: true // 能否滑动
    }
  },
  mounted () {
    this.tmp = this.value
  },
  methods: {
    /**
       * @description: 物体划过
       * @param {type} index:当前的数量type:激活状态还是未激活状态
       * @return:
       */
    handleOver (index, type) {
      if (this.canHover) {
        if (type === 'active') {
          this.count = index // 滑过激活状态的星星时
        } else {
          this.count += index // 划过未激活状态的星星
        }
        this.$emit('hoverChange', this.count)
      }
    },
    /**
       * @description: 划出时
       * @param {type}
       * @return:
       */
    handleLeave () {
      this.count = this.tmp
      this.canHover = true
    },
    /**
       * @description: 评分
       * @param {type} index:数量,type:激活状态还是未激活状态
       * @return:
       */
    rate (index, type) {
      if (!this.disabled) {
        if (type === 'normal') {
          if (this.count === 0) {
            // 还没有选中的时候，
            this.count = Number(index)
          } else {
            // 已经有星星选中，点击未激活状态的
            this.count = Number(this.count) + index
          }
        } else {
          // 有部分星星选中的时候点击激活状态的
          this.count = Number(index)
          if (this.allowClear) {
            if (this.currentNum === index) {
              this.count = 0 // 二次点击的时候清除全部
              this.canHover = false
            }
          }
        }
        this.currentNum = this.count
        this.tmp = this.count // 滑动过程中点击
        this.$emit('input', this.count)
        this.$emit('change', this.count)
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .star {
    color: #ff9800;
    font-size: 0;

    &-item {
      display: inline-block;
      cursor: pointer;
      width: 32px;
      height: 32px;
      position: relative;
      transition: .5s ease;
      font-size:14px;
    }

    &-txt {
      font-size: 14px;
    }

    &-normal {
      color: #e8e8e8;
    }

    &-active {
      color: #f4ea2a;
    }
  }

</style>
