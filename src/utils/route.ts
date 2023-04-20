// 保存路由重定向信息
import {RouteConfig} from "../ts/router";

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
export function filterRoute(routes: Array<RouteConfig>, roles: Array<string>): Array<RouteConfig> {
    const res: Array<RouteConfig> = []
    routes.forEach((route) => {
        const r = {...route}
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterRoute(r.children, roles)
            }
            res.push(r)
        }
    })
    return res
}

export function judgeShowingChild(item: RouteConfig): Array<RouteConfig> {
    let showingChildren: Array<RouteConfig> = []
    if (item.children?.length) {
        showingChildren = item.children.filter((item) => !item.hidden)
    }
    return showingChildren
}
