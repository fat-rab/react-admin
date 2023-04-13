import Login from "../pages/login";
import Layout from "../layout";
import {lazy, ReactNode} from "react";
import {Navigate} from "react-router-dom";

const Home = lazy(() => import('../pages/home'))
const NotFound = lazy(() => import('../pages/errorPage/404'))

export interface RouteConfig {
    path: string;
    element: ReactNode;
    meta?: RouteMeta
    children?: RouteConfig[];
    redirect?: string
}

export interface RouteMeta {
    roles?: Array<string>;
}

export const routers: Array<RouteConfig> = [
    {path: '/login', element: <Login/>},
    {
        path: '/', element: <Navigate to="/home"/>
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: 'home', element: <Home/>}
        ]
    },
    {
        path: '*', element: <NotFound/>
    },
]
