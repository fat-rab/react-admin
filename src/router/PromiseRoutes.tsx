import {Navigate} from "react-router-dom";
import Layout from "../layout";
import {RouteConfig} from "./index";
import {lazy} from "react";

const SysManager = lazy(() => import('../pages/sys/sysManager'))
export const promiseRouters: Array<RouteConfig> = [
    {
        path: '/sys', element: <Navigate to="/sys/sysManager"/>
    },
    {
        path: '/sys',
        element: <Layout/>,
        meta: {
            roles: ['sys:admin']
        },
        children: [
            {path: 'sysManager', element: <SysManager/>}
        ]
    },
]
