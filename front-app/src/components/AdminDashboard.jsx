import { useEffect } from "react"
import { useAuthGuard } from "../services/GuardService";
import { useNavigate } from "react-router-dom";

function AdminDashboard(){
    const guard = useAuthGuard();
    const navigate = useNavigate();

    useEffect(()=>{
        if(guard.user===null){
            navigate("/");
        }
    },[guard]);

    return(
        <div className="admin-dashboard">
            <p>Admin Dashboard</p>
        </div>
    )
}

export {
    AdminDashboard
}