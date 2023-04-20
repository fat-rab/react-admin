import {title} from "../../../setting";

function Logo() {
    return (
        <div>
            <img
                style={{verticalAlign: 'middle'}}
                src="/src/assets/images/layout/logo.png"
                alt="logo"
                width="28"
                height="28"
            />
            <span className={'sys-title'}>{title}</span>
        </div>
    )
}

export default Logo
