import axios, {AxiosResponse} from "axios";
import {getToken, TokenKey} from "./token";

import store from "../store/index"
import {removeUserInfo} from "../store/user";
import {removePromiseRouters} from "../store/promise";
import {message} from "antd";
import {showMessageBox} from "./messageBox";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
})

request.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers[TokenKey] = `${getToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    if (response.config.responseType === 'blob') return response
    return response.data
}, (error) => {

    const errObj = error.response.data
    if (error.config.responseType === 'blob') {
        message.error('文件下载异常')
        return Promise.reject('文件下载异常')
    }

    // token过期，token错误等情况
    if (errObj.errorCode === '00405') {
        showMessageBox(errObj.errorMessage).then(() => {
            // 清空 用户信息和菜单
            store.dispatch(removeUserInfo())
            store.dispatch(removePromiseRouters())
            Promise.resolve().then(() => {
                location.reload()
            })
        })
    } else {
        message.error(errObj.errorMessage)
    }

    return Promise.reject(error)
})
export default request
