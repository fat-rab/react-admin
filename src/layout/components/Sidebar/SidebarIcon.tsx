import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

interface SidebarIconProps {
    url: string
}

function SidebarIcon(props: SidebarIconProps) {
    const {url} = props
    // console.log(url)
    const location = useLocation()
    const [imagePath, setImagePath] = useState(`/images/menu/${url}.svg`)
    useEffect(() => {
        let path = `/images/menu/${url}.svg`
        if (location.pathname.indexOf(url) > -1) {
            path = `/images/menu/${url}-active.svg`
        }
        setImagePath(path)
    }, [location.pathname])
    return (
        <img className={'sidebar-icon'} src={imagePath} alt={url}/>
    )
}

export default SidebarIcon
SidebarIcon.proptypes = {
    url: PropTypes.string
}
