import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {RouteConfig} from "../../ts/router";
import {promiseRouters, routers} from "../../router";
import {filterRoute} from "../../utils/route";
import {removePromiseRouters, setPromiseRouters} from "../../store/promise";
import {getToken} from "../../utils/token";
import {getDictReducer} from "../../store/dict";
import {getUserInfo} from "../../apis/user";
import {ResStructure} from "../../ts/axios";
import {UserState} from "../../ts/store/user";
import {removeUserInfo, setUserInfo} from "../../store/user";

function MyRoute() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const token = getToken()
    const locationMsg = useLocation()
    const roles = useAppSelector((state) => state.user.roles)
    const dict = useAppSelector((state) => state.dict.dict)
    const [element, setElement] = useState<Array<RouteConfig>>(routers)
    useEffect(() => {
        // console.log(token, 'token')
        if (!token) {
            navigate('/login')
        } else {
            // 如果登录页面，并且存在token，则跳转首页
            if (locationMsg.pathname === '/login') {
                navigate('/home')
            } else {
                if (!roles.length) {
                    getUserInfoFn()
                }
                if (Object.keys(dict).length === 0) {
                    dispatch(getDictReducer())
                }
            }
        }
    }, [token, locationMsg.pathname])

    // 获取用户信息
    function getUserInfoFn() {
        getUserInfo().then((res: ResStructure<UserState>) => {
            // console.log(res, 'res')
            dispatch(setUserInfo(res.data))
            const arr = filterRoute(promiseRouters, res.data.roles)
            dispatch(setPromiseRouters(arr))
            // 设置路由表
            setElement([...routers, ...arr])
        }).catch((err) => {
            const errObj = err.response.data
            // 00405的错误已经统一处理
            // 这个获取用户信息接口如果报错，需要特殊处理
            if (errObj.errorCode !== '00405') {
                dispatch(removeUserInfo())
                dispatch(removePromiseRouters())
                Promise.resolve().then(() => {
                    location.reload()
                })
            }
        })
    }

    // 给路由套上一层自定义组件，用来统一处理某些事物
    // function formatRoutes(routerArr: Array<RouteConfig>): Array<RouteConfig> {
    //     const arr: Array<RouteConfig> = []
    //     routerArr.forEach((item) => {
    //         let route = {
    //             ...item,
    //             //如果是多级路由，则父级不需要JudgePromise
    //             element: item.children?.length ? item.element : <JudgePromise>{item.element}</JudgePromise>,
    //             children: item.children && item.children.length ? formatRoutes(item.children) : undefined
    //         }
    //         arr.push(route)
    //     })
    //     return arr
    // }

    return (
        <Suspense fallback={""}>
            {useRoutes(element)}
        </Suspense>
    )
}

export default MyRoute

