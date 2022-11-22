import { Outlet, Navigate } from "react-router"
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const user = useSelector(state => state.user.currentUser);
    return(
        user && user.isAdmin ? (<Outlet />) : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
