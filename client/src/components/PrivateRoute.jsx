import React, { useEffect } from 'react';
import { isAuth } from './Helpers';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const{Component}=props
    const navigate=useNavigate()
    
    useEffect(()=>{
        if (!isAuth()) {
            navigate('/signin')
        }
    })
    return (
        <div>
            <Component/>
            
        </div>
    );
};

export default PrivateRoute;