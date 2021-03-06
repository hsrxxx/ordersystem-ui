
/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { Message, Loading } from 'element-ui';
import store from '../store/index'
 
let loadinginstace

// 环境的切换
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = '/client';
} else if (process.env.NODE_ENV === 'debug') {
    axios.defaults.baseURL = '/client';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/client';
}
 
// 请求超时时间
axios.defaults.timeout = 10000;
 
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 请求时加载element ui loading 组件
        let domId = '#' + config.url.split('/')[1]
        if (config.url.toString().indexOf('findById') != -1){
            domId = '#form'
        }
        if (loadinginstace){
            loadinginstace.close()
        }
        loadinginstace = Loading.service({
            // 根据 dom 的 id 来进行渲染指定 dom
            target: domId,
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'hsla(0,0%,100%,.9)',
            customClass:"loading",
            fullscreen: true 
        })
        // // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;        
        // // 如果 token 为空（false）则不赋值给 config.headers.Authorization 
        // token && (config.headers.Authorization = token);
        // console.log('调用 loading')
        return config;    
    },    
    error => {    
        // 关闭 element ui loading 组件
        loadinginstace && loadinginstace.close()
        return Promise.error(error);    
    })
 
// 响应拦截器
axios.interceptors.response.use(    
    response => {
        if (response.status === 200) {
            // console.log('关闭 loading')
            loadinginstace && loadinginstace.close()
            return Promise.resolve(response);        
        } else {
            loadinginstace && loadinginstace.close()
            return Promise.reject(response);        
        }    
    },
    error => {
        loadinginstace.close()
        return Promise.reject(error.response);
    }
    // 服务器状态码不是200的情况    
    // error => {        
    //     loadinginstace.close() 
    //     if (error.response.status) {            
    //         switch (error.response.status) {                
    //             // 401: 未登录                
    //             // 未登录则跳转登录页面，并携带当前页面的路径                
    //             // 在登录成功后返回当前页面，这一步需要在登录页操作。                
    //             case 401:                    
    //                 router.replace({                        
    //                     path: '/login',                        
    //                     query: { redirect: router.currentRoute.fullPath } 
    //                 });
    //                 break;
    //             // 403 token过期                
    //             // 登录过期对用户进行提示                
    //             // 清除本地token和清空vuex中token对象                
    //             // 跳转登录页面                
    //             case 403:                     
    //                 Message('登录过期，请重新登录')                  
    //                 // 清除token                    
    //                 localStorage.removeItem('token');                    
    //                 store.commit('loginSuccess', null);                    
    //                 // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
    //                 setTimeout(() => {                        
    //                     router.replace({                            
    //                         path: '/login',                            
    //                         query: { 
    //                             redirect: router.currentRoute.fullPath 
    //                         }                        
    //                     });                    
    //                 }, 1000);                    
    //                 break; 
    //             // 404请求不存在                
    //             case 404:                    
    //                 Message('网络请求不存在');                    
    //             break;                
    //             // 其他错误，直接抛出错误提示                
    //             default:                    
    //                 Message(error.response.data.message)         
    //         }            
    //         return Promise.reject(error.response);        
    //     }       
    // }
);

/** 
 * get方法，对应get请求 
 * @param { String } url [请求的url地址] 
 * @param { Object } params [请求时携带的参数] 
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, { params: params })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/** 
 * post方法，对应post请求 
 * @param { String } url [ 请求的url地址 ] 
 * @param { Object } params [ 请求时携带的参数 ] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}


/** 
 * post方法，对应post请求 
 * @param { String } url [ 请求的url地址 ] 
 * @param { Object } params [ 请求时携带的参数 ] 
 */
export function qspost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * put方法，对应put请求
 * @param { String } url [ 请求的url地址 ]
 * @param { Object } params [ 请求时携带的参数 ]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
    

/**
 * put方法，对应put请求
 * @param { String } url [ 请求的url地址 ]
 * @param { Object } params [ 请求时携带的参数 ]
 */
export function qsput(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * delete方法，对应delete请求
 * @param { String } url [ 请求的url地址 ]
 * @param { Object } params [ 请求时携带的参数 ]
 */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/** 
 * delete方法，对应delete请求 
 * @param { String } url [ 请求的url地址 ] 
 * @param { Object } params [ 请求时携带的参数 ] 
 */
export function qsdeletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(
            url,
            {
                params,
                paramsSerializer: params => {
                    return QS.stringify(params, { indices: false })
                }
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
