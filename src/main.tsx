import React from 'react'
import ReactDOM from 'react-dom/client'
import MyApp from './pages/myApp'
import './style/index.less'
import {HashRouter} from "react-router-dom";
import {ConfigProvider, App as AntApp} from "antd";
import {themeObj} from "./style/theme";
import {Provider} from 'react-redux'
import store from "./store";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <Provider store={store}>
//         <MyApp/>
//     </Provider>
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ConfigProvider theme={{token: themeObj}}>
            <HashRouter>
                <AntApp>
                    <MyApp/>
                </AntApp>
            </HashRouter>
        </ConfigProvider>
    </Provider>
)
