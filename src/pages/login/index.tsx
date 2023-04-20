import './index.less'
import {Form, Input, Button} from "antd";
import {LoginForm} from "../../ts/pages/login";
import md5 from "md5"
import {login} from "../../apis/user";
import {useState} from "react";
import {AxiosResponse} from "axios";
import {setToken} from "../../utils/token";
import {useNavigate} from "react-router-dom";
import {getRedirectRoute, removeRedirectRoute} from "../../utils/redirect";

function Login() {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const onFinish = (form: LoginForm) => {
        if (!form.username && !form.password) return
        setLoading(true)
        login({username: form.username, password: md5(form.password)}).then((res: AxiosResponse<string>) => {
            setToken(res.data)
            let path = '/home'
            if (form.username !== sessionStorage.getItem('oldName')) {
                removeRedirectRoute()
            } else {
                const redirect = getRedirectRoute()
                if (redirect) {
                    path = redirect.path + redirect.query
                } else {
                    path = '/home'
                }
            }
            navigate(path)
            setLoading(false)
        })
    };
    return (
        <div className='login-container'>
            <div className={'left-container'}></div>
            <div className={'right-container'}>
                <img width="141" height="36" src="/src/assets/images/login/login-text.svg" alt="login-text"/>
                <div className={'form-container'}>
                    <Form
                        name="loginForm"
                        initialValues={{
                            username: 'admin',
                            password: 'admin123'
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item name="username">
                            <Input size='large' prefix={<HeadIcon/>}/>
                        </Form.Item>

                        <Form.Item name="password">
                            <Input.Password size='large' prefix={<PasswordIcon/>}/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{width: '100%'}}
                                type="primary" size='large'
                                htmlType="submit"
                                loading={loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

function HeadIcon() {
    return (
        <img src="/src/assets/images/login/head.svg" alt="head"/>
    )
}

function PasswordIcon() {
    return (
        <img src="/src/assets/images/login/password.svg" alt="head"/>
    )
}

export default Login
