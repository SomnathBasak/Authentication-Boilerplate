import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({ children })=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState("");

    const  storeToken =(serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem('token',serverToken);

    };
    let isLoggedIn=!!token;
    console.log(isLoggedIn);

    //logout fuctionality
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem('token');
    }


    //getting userdata currently loggedin
    const URL="http://localhost:8000/api/auth/user"
    const userAuthetication=async()=>{
        try {
            const response=await fetch(URL,{
                method:"GET",
                headers:{
                Authorization:`Bearer ${token}`
                }
            })
            if(response.ok){
                const data=await response.json();
                console.log(data.userData);
                setUser(data.userData);

            }
        } catch (error) {
            console.log('error fetching data');
        }
    }


    
    useEffect(()=>{
        //getServices();
        userAuthetication();

    },[])

    return(
        <AuthContext.Provider value={{ isLoggedIn, storeToken, LogoutUser, user }}>
            {children}
            </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext)
    if (!authContextValue) {
        throw new Error ('useAuth used outside of the provider')
    }
    return authContextValue;
}


