import {getToken} from "../utils/token";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function JudgePromise({children}: any) {
    const token = getToken()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            // 跳转到首页
            if (location.pathname === '/login') {
                navigate('/home')
            } else {
                // 如果是其他路由就跳到其他的路由
                navigate(location.pathname);
            }
        }
    }, [])
    return children
}

export default JudgePromise
