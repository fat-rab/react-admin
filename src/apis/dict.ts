import request from "../utils/request"

export function getAllDict() {
    return request({
        url: '/api/auth/sys/dict/all',
        method: 'get'
    })
}
