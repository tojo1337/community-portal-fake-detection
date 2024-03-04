import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../services/GuardService"

function ModDashboard(){
    const guard = useAuthGuard();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(guard.user===nnull){
            navigate("/");
        }
    },[guard]);
    
    return(
        <div className="mod-dashboard">
            <p>Moderator dashboard</p>
        </div>
    )
}

export {
    ModDashboard
}