import Login from "../pages/login";
import {lazy} from "react";
import {RouteConfig} from "../ts/router";

const NotFound = lazy(() => import('../pages/errorPage/404'))

export let constRouters: Array<RouteConfig> = []
const constModulesFiles = import.meta.globEager('./constModules/*.tsx')
for (const modules in constModulesFiles) {
    constRouters = constRouters.concat(constModulesFiles[modules].default)
}

export let promiseRouters: Array<RouteConfig> = []
const promiseModulesFiles = import.meta.globEager('./promiseModules/*.tsx')
for (const modules in promiseModulesFiles) {
    promiseRouters = promiseRouters.concat(promiseModulesFiles[modules].default)
}
export const routers: Array<RouteConfig> = [
    {path: '/login', element: <Login/>},
    ...constRouters,
    {
        path: '*', element: <NotFound/>
    },
]
