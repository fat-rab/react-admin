import {useAppSelector} from "../../store";
import {useEffect, useState} from "react";
import {matchRoutes, useLocation} from "react-router-dom";

function NotFound() {
    const promiseRouters = useAppSelector((state) => state.promise.promiseRouters)
    const location = useLocation()
    const [showNotFound, setShowNotFound] = useState(false)
    useEffect(() => {
        if (promiseRouters.length) {
            if (!matchRoutes(promiseRouters, location)) {
                //如果不能匹配到路由则显示404
                setShowNotFound(true)
            }
        }
    })
    return (
        <div>{showNotFound ? '404' : '请稍后'}</div>
    )
}

export default NotFound
