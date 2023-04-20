import {ReactNode} from "react";


export interface RouteRedirect {
    path: string
    name?: string
    query?: {
        [key: string]: any
    }
}

export interface RouteConfig {
    path: string;
    element: ReactNode
    meta?: RouteMeta
    children?: RouteConfig[]
    redirect?: string
    hidden?: boolean
    alwaysShow?: boolean
}

export interface RouteMeta {
    title: string
    icon?: string
    roles?: Array<string>
    // noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
}
