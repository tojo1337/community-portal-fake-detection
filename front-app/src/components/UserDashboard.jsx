import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthGuard } from "../services/GuardService"

function UserDashboard(){
    const guard = useAuthGuard();
    const navigate = useNavigate();

    useEffect(()=>{
        if(guard.user===null){
            navigate("/");
        }
    },[guard]);

    return(
        <div className="user-dashboard">
            <p>User dashboard</p>
        </div>
    )
}

export {
    UserDashboard
}