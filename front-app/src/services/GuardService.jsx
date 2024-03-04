import { createContext, useContext, useState } from "react";

const Guard = createContext(null);

function AuthGuard({ children }){
    const [user,setUser] = useState(null);
    const login = (user)=>{
        setUser(user);
    }
    const logout = ()=>{
        setUser(null);
    }
    return(
        <Guard.Provider value={{user,login,logout}}>
            { children }
        </Guard.Provider>
    )
}

function useAuthGuard(){
    return useContext(Guard);
}

export {
    AuthGuard,
    useAuthGuard
}