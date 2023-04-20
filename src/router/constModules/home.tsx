import {Navigate} from "react-router-dom";
import {RouteConfig} from "../../ts/router";
import Home from "../../pages/home";
import Layout from "../../layout";

const homeRouters: Array<RouteConfig> = [
    {
        path: '/', meta: {title: '重定向path'}, element: <Navigate to="/home"/>, hidden: true
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'home',
                // parentPath:'/',
                meta: {
                    title: '首页',
                    icon: 'home'
                },
                element: <Home/>
            }
        ]
    },
]
export default homeRouters
