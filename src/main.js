import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.use(ElementUI);

// 全局消息
Vue.prototype.$Message = Message

Vue.config.productionTip = false

// Vue.http.interceptors.push((request, next) => {
//   let timeout;
//
//   if (request._timeout) {
//
//     timeout = setTimeout(() => {
//       //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
//       next(request.respondWith(request.body, {
//         status: 408,
//         statusText: '请求超时'
//       }));
//
//     }, request._timeout);
//   }
//   next((response) => {
//     // ...
//     // 请求发送后的处理逻辑
//     // ...
//     // 根据请求的状态，response参数会返回给successCallback或errorCallback
//     return response
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
