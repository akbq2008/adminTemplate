/*
 * @Author: wang_yechao
 * @Date: 2020-03-24 23:11:05
 */
import Vue from 'vue'
import Loading1 from '@/components/Loading/loading1/index.vue'
import Loading2 from '@/components/Loading/loading2/index.vue'
import Loading3 from '@/components/Loading/loading3/index.vue'
import Loading4 from '@/components/Loading/loading4/index.vue'
import Loading5 from '@/components/Loading/loading5/index.vue'
import Loading6 from '@/components/Loading/loading6/index.vue'
import Loading7 from '@/components/Loading/loading7/index.vue'
import Loading8 from '@/components/Loading/loading8/index.vue'
import Loading9 from '@/components/Loading/loading9/index.vue'
import Loading10 from '@/components/Loading/loading10/index.vue'
import Loading11 from '@/components/Loading/loading11/index.vue'
import Loading12 from '@/components/Loading/loading12/index.vue'
import Loading13 from '@/components/Loading/loading13/index.vue'
import Loading14 from '@/components/Loading/loading14/index.vue'
const components = [
  Loading1,
  Loading2,
  Loading3,
  Loading4,
  Loading5,
  Loading6,
  Loading7,
  Loading8,
  Loading9,
  Loading10,
  Loading11,
  Loading12,
  Loading13,
  Loading14
]
let component = {
  install: function (Vue) {
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}

Vue.use(component.install)
