import {title} from "../../../setting";
import logo from "../../../assets/images/layout/logo.png"

function Logo() {
    return (
        <div>
            <img
                style={{verticalAlign: 'middle'}}
                src={logo}
                alt="logo"
                width="28"
                height="28"
            />
            <span className={'sys-title'}>{title}</span>
        </div>
    )
}

export default Logo
