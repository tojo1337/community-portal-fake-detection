import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthGuard";
import { logout as logOut } from "../../static/Api";
import axios from "axios";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state=> state.authGuard.bearerToken);

    useEffect(() => {
        axios.get(logOut,{
            headers: {
                "Authorization": token,
            }
        });
        dispatch(logout());
        navigate("/");
    }, []);

    return(
        <></>
    )
}

export {
    Logout,
}