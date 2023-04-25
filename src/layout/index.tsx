import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.less"
import Sidebar from "./components/Sidebar";

function Layout() {
    return (
        <div className={'app-wrapper'}>
            <NavBar/>
            <div className={'sidebar-main-container'}>
                <div>
                    <Sidebar/>
                </div>
                <div className={'content-container'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout
