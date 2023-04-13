import {useNavigate, useRoutes} from "react-router-dom";
import {RouteConfig, routers} from "./router";
import {promiseRouters} from "./router/PromiseRoutes";
import JudgePromise from "./router/judgePromise";
import {useAppDispatch} from "./store";
import {setUserInfo} from "./store/user";
import {setPromiseRoutes} from "./store/promise";
import {getToken} from "./utils/token";
import {Suspense, useEffect, useState} from "react";
import {getUserInfo} from "./apis/user";
import {getPromiseRouters} from "./utils/route";

function App() {
    const [element, setElement] = useState<Array<RouteConfig>>(routers)
    const token = getToken()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            getUserInfoFn()
        }
    }, [])

    // 获取用户信息
    async function getUserInfoFn() {
        try {
            const res = await getUserInfo()
            // console.log(res.data)
            dispatch(setUserInfo(res.data))
            // 获取有权限访问的路由
            const arr = getPromiseRouters(promiseRouters, res.data.roles)
            dispatch(setPromiseRoutes(arr))
            setElement([...routers, ...formatRoutes(arr)])
        } catch (err) {
            // TODO 弹出警告
            navigate('/login')
        }


        // if (!roleArr.length) {
        //     try {
        //         dispatch(getUserInfoReducer()).then((res) => {
        //             const userState: UserState = res.payload
        //
        //         })
        //     } catch (error) {
        //         //TODO 弹出警告
        //         navigate('/login')
        //     }
        // }
    }

    // 给路由套上一层自定义组件，用来判断token等权限
    function formatRoutes(routerArr: Array<RouteConfig>): Array<RouteConfig> {
        const arr: Array<RouteConfig> = []
        routerArr.forEach((item) => {
            let route = {
                ...item,
                element: <JudgePromise>{item.element}</JudgePromise>,
                children: item.children && item.children.length ? formatRoutes(item.children) : undefined
            }
            arr.push(route)
        })
        return arr
    }

    return (
        <div className="App">
            <Suspense fallback={""}>
                {useRoutes(element)}
            </Suspense>
        </div>
    )
}


export default App
