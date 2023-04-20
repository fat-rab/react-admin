import {Navigate} from "react-router-dom";
import {RouteConfig} from "../../ts/router";
import Layout from "../../layout";
import {lazy} from "react";

const SysManager = lazy(() => import('../../pages/sys/sysManager'))
const SysTest = lazy(() => import('../../pages/sys/sysTest'))
const SysTest1 = lazy(() => import('../../pages/sys/sysTest/sysTest1'))
const sysRouters: Array<RouteConfig> = [
    {
        path: '/sys', meta: {title: '重定向path'}, element: <Navigate to="/sys/sysManager"/>, hidden: true
    },
    {
        path: '/sys',
        element: <Layout/>,
        meta: {
            title: '系统',
            roles: ['sys:admin'],
            icon: '/sys'
        },
        alwaysShow: true,
        children: [
            {
                path: 'sysManager',
                meta: {
                    title: '系统管理'
                },
                element: <SysManager/>,
            },
            {
                path: 'sysTest',
                meta: {
                    title: '系统测试'
                },
                element: <SysTest/>,
                alwaysShow: true,
                children: [
                    {
                        path: 'sysTest1',
                        meta: {
                            title: '系统测试1'
                        },
                        element: <SysTest1/>,
                    }
                ]
            }
        ]
    }
]
export default sysRouters
