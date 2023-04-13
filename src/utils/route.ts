// 保存路由重定向信息
import {RouteConfig} from "../router";


export function saveRedirectRoute() {
    // const routeMsg = router.currentRoute.value
    // sessionStorage.setItem('redirect', JSON.stringify({
    //     path: routeMsg.path,
    //     name: routeMsg.name,
    //     query: routeMsg.query
    // }))
}

export function removeRedirectRoute() {
    sessionStorage.removeItem('redirect')
}

export const hasPermission = (roles: Array<string>, route: RouteConfig): boolean => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => {
            if (route.meta?.roles !== undefined) {
                return route.meta.roles.includes(role)
            }
        })
    } else {
        return true
    }
}
export function getPromiseRouters(routerArr: Array<RouteConfig>,roleArr:Array<string>): Array<RouteConfig> {
    const arr: Array<RouteConfig> = []
    routerArr.forEach((item) => {
        if (hasPermission(roleArr, item)) {
            arr.push(item)
        }
    })
    return arr
}
