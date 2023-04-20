import {Dropdown, MenuProps, Space} from "antd";
import {DownOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../../store";
import {logout} from "../../../apis/user";
import {removeUserInfo} from "../../../store/user";
import {useNavigate} from "react-router-dom";
import {removePromiseRouters} from "../../../store/promise";
import {useLocation} from "react-router-dom"
import {saveRedirectRoute} from "../../../utils/redirect";

function AvatarInfo() {
    const nickName = useAppSelector((state) => state.user.nickname)
    const phone = useAppSelector((state) => state.user.phone)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    退出登录
                </span>
            ),
        },
    ];
    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === '1') {
            //退出登录
            logoutFn()
        }
    };

    function logoutFn() {
        logout().then(async () => {
            // 保存旧用户名，如果再次登录不是这个账号，就不重定向
            sessionStorage.setItem('oldName', phone)
            saveRedirectRoute(location.pathname, location.search)
            await dispatch(removeUserInfo())
            await dispatch(removePromiseRouters())
            navigate('/login')
        })
    }

    return (
        <div className={'avatar-container'}>
            <img
                className="user-avatar"
                src="/src/assets/images/layout/head.svg"
                alt="头像"
            />
            <Dropdown menu={{items, onClick}} placement='bottom'>
                <Space>
                    <span className="user-name">{nickName}</span>
                    <DownOutlined className="icon"/>
                </Space>
            </Dropdown>
        </div>
    )
}

export default AvatarInfo
