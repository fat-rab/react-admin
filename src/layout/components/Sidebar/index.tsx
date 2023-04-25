import {Menu, MenuProps} from "antd";
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useAppSelector} from "../../../store";
import React, {useEffect, useState} from "react";
import {RouteConfig} from "../../../ts/router";
import SidebarIcon from "./SidebarIcon";
import {useLocation, useNavigate} from "react-router-dom";
import path from 'path'
import {constRouters} from "../../../router";
import {getLastPath, getOpenKeys} from "../../../utils/sidebar";

function pathResolve(path1: string, path2: string) {
    return path.resolve(path1, path2)
}

function formatMenu(routerArr: Array<RouteConfig>): MenuProps['items'] {
    const menuArr: MenuProps['items'] = []
    routerArr.forEach((item) => {
        if (!item.hidden) {
            if (item.children?.length === 1 && !item.alwaysShow) {
                // 如果父路由只有一个子路由，并且本身没有配置alwaysShow=true，则拉平
                let routeChild = item.children[0]
                const key = pathResolve(pathResolve('/', item.path), routeChild.path)
                // console.log(routeChild, 'routeChild')
                menuArr.push({
                    label: routeChild.meta?.title,
                    key,
                    icon: routeChild.meta?.icon ? <SidebarIcon url={routeChild.meta?.icon}/> : undefined,
                    children: routeChild.children ? formatMenu(routeChild.children) : undefined
                })
            } else {
                const key = pathResolve('/', item.path)
                menuArr.push({
                    label: item.meta?.title,
                    key,
                    icon: item.meta?.icon ? <SidebarIcon url={item.meta?.icon}/> : undefined,
                    children: item.children ? formatMenu(item.children) : undefined
                })
            }
        }
    })
    return menuArr
}

function Sidebar() {
    const [items, setItems] = useState<MenuProps['items']>([])
    const promiseRouters = useAppSelector((state) => state.promise.promiseRouters)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (items?.length) return
        if (promiseRouters.length) {
            // console.log([...constRouters, ...promiseRouters], 'promiseRouters')
            //  console.log(formatMenu([...constRouters, ...promiseRouters]), 'qwe')
            setItems(formatMenu([...constRouters, ...promiseRouters]))
        }
    }, [promiseRouters])


    const onClick: MenuProps['onClick'] = (e) => {
        const path = e.keyPath.reduceRight((a: string, b: string) => {
            return a + b
        })
        navigate(path)
    };

    const [openKeys, setOpenKeys] = useState<Array<string>>([]);
    useEffect(() => {
        // 设置展开菜单
        setOpenKeys(getOpenKeys(location.pathname))
    }, [])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([getLastPath(location.pathname)]);
    useEffect(() => {
        setSelectedKeys([getLastPath(location.pathname)])
    }, [location.pathname])
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        // console.log(openKeys, keys, 'keys')
        if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys);
        const latestOpenKey = keys[keys.length - 1];
        if (latestOpenKey.includes(keys[0])) return setOpenKeys(keys);
        setOpenKeys([latestOpenKey]);
    }

    return (
        <div className={'sidebar-container'}>
            <Scrollbars>
                <Menu
                    onClick={onClick}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    mode="inline"
                    items={items}
                    onOpenChange={onOpenChange}
                />
            </Scrollbars>
        </div>
    )
}

export default Sidebar
