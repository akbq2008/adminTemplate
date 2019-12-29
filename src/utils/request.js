import Vue from 'vue'
import axios from 'axios'
import {
  getToken
} from '@/utils/auth'
import {
  MessageBox
} from 'element-ui'
import router from '../router'
var interceptorsNum = 0
const $axios = axios.create({
  withCredentials: false,
  baseURL: process.env.BASE_API
})
// request interceptor
$axios.interceptors.request.use(
  config => {
    config.headers['X-Token'] = getToken()
    config.headers['Authorization'] = 'Bearer ' + getToken()
    if (config.method === 'get' || config.method === 'GET') {
      const query = config.data
      let link = ''
      for (const key in query) {
        link += '&' + key + '=' + query[key]
      }
      if (link.substr(1)) {
        config.url += '?' + link.substr(1)
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  response => {
    if (response.data.code === 409) {
      return (() => {
        if (interceptorsNum === 0) {
          interceptorsNum++
          MessageBox.alert('登录信息失效, 请重新登录?', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              try {
                localStorage.removeItem('userName')
                localStorage.removeItem('Admin-Token')
                const error = {
                  error: '登录信息失效'
                }
                throw (error)
              } catch (error) {
                router.push('/login')
                interceptorsNum = 0
              }
            }
          })
        }
        return response
      })()
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = $axios
export default $axios
