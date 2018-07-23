import axios from 'axios'
import { Toast } from 'vant'

let errorFlag = false
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000', // api的base_url
  timeout: 10000, // 请求超时时间
  transformRequest: [(data) => {
    // 对 data 进行任意转换处理
    // let body = new URLSearchParams()
    // // // let body = new FormData()
    // if (typeof data === 'object' && data !== null) {
    //   Object.keys(data).forEach(item => {
    //     if (data[item] !== null && data[item] !== undefined && data[item] !== '') {
    //       if (Array.isArray(data[item])) {
    //         body.append(item, JSON.stringify(data[item]))
    //       } else {
    //         body.append(item, data[item])
    //       }
    //     }
    //   })
    //   return body
    // }
    return JSON.stringify(data)
  }]
})
axios.defaults.withCredentials = true // 自动获取cookie

// request拦截器
service.interceptors.request.use(config => {
  // config.headers.post['Content_Type'] = 'application/json'
  config.headers['Content-Type'] = 'application/json' // 改变data的数据格式
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    return response
  },
  error => {
    if (!errorFlag) {
      errorFlag = true
      Toast.fail('网络连接异常')
      errorFlag = false
    }
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
