import {Outlet} from "react-router-dom";

function Layout() {

    return (
        <div>
            layout
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout
