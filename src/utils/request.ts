import axios, {AxiosResponse} from "axios";
import {getToken, TokenKey} from "./token";
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
    const [messageApi] = message.useMessage()
    if (error.config.responseType === 'blob') {
        messageApi.open({
            type: 'error',
            content: '文件下载异常',
        })
        return Promise.reject('文件下载异常')
    }


    const errObj = error.response.data
    // token过期，token错误等情况
    if (errObj.errorCode === '00405') {
        // showMessageBox(`${errObj.errorMessage}`).then(() => {
        //     const userStore = useUserStore()
        //     // 重置token,刷新页面重新登录
        //     userStore[UserActionEnum.RESET_TOKEN]()
        //     location.reload()
        // })
        showMessageBox(errObj.errorMessage).then(() => {
            //TODO
        })
    } else {
        messageApi.open({
            type: 'error',
            content: errObj.errorMessage,
        })
    }

    return Promise.reject(error)
})
export default request
