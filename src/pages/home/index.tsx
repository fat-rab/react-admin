import {useAppSelector} from "../../store";

function Home() {
    const roleArr = useAppSelector((state) => state.user.roles)
    return (
        <div>{roleArr.join(',')}</div>
    )
}

export default Home
