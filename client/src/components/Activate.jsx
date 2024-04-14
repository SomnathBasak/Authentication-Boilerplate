import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


const Activate = () => {
    const params=useParams()
    
    const [values,setValues]=useState({
        name:'',token:'',show:true
    })  
    
 
    useEffect(()=>{
         let token=params.token
        let {name}=jwtDecode(token)
        if(token){
            setValues({...values,name,token})
        }            
            },[])
    const{name,token,show}=values;
    const clickSubmit=event=>{
        event.preventDefault();
        axios({
            method:"POST",
            url:`${import.meta.env.VITE_REACT_APP_API}/account-activation`,
            data:{token}
        }).then(response=>{
            console.log('Acount Activated',response)
        setValues({...values,show:false})
        toast.success(response.data.message)    
    }).catch(error=>{
        console.log('Account Activation Error',error)
        toast.success(error.response.data.error)

    })


    }
    return (
        
        <div className='col-md-6 offset-md-3 text-center'>
            <ToastContainer/>   
            <h1 className='p5 '>Hi {name}, Please click below link to Activate your account...</h1>
            <button className='btn btn-outline-primary' onClick={clickSubmit}>Activate Account</button>           
        </div>
    );
};

export default Activate;