import request from "../utils/request";
export function login(data: any) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: '/api/auth/sys/user/current',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/api/logout',
        method: 'post'
    })
}

// 获取行政区树形结构
export function getAreaTreeList() {
    return request({
        url: '/api/psy/base/all/area',
        method: 'get'
    })
}

export function getUserAreaTreeList() {
    return request({
        url: '/api/psy/base/user/area',
        method: 'get'
    })
}

export function editPassword(data: any) {
    return request({
        url: '/api/auth/sys/user/revise/password',
        method: 'post',
        data
    })
}

export function editPhoneNumber(phone: string) {
    return request({
        url: '/api/auth/sys/user/update/user/info',
        method: 'post',
        data: {
            phone
        }
    })
}
