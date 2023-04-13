import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.css'
import {HashRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import {themeObj} from "./style/theme";
import {Provider} from 'react-redux'
import store from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider theme={{token: themeObj}}>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </ConfigProvider>
)
