import React, { useEffect } from 'react';
import { isAuth } from './Helpers';
import { useNavigate } from 'react-router-dom';

const AdminRoute = (props) => {
    const{Component}=props
    const navigate=useNavigate()
    
    useEffect(()=>{
        if (isAuth()&& isAuth().role==='admin') {
            <Component/>
        }
        else{
            navigate('/')
        }
    })
    return (
        <div>
            <Component/>
            
        </div>
    );
};

export default AdminRoute;