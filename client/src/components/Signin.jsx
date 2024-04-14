import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import {authenticate, isAuth} from './Helpers'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Signin = () => {
    let navigate = useNavigate();

    
    const [values,setValues]=useState({
        username:'somnath66',password:'12345',buttonText:'Submit'
    })
    const{username,password}=values;
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})

    }
    const clickSubmit=event=>{
        event.preventDefault();
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:"POST",
            url:`${import.meta.env.VITE_REACT_APP_API}/signin`,
            data:{username,password}
        }).then(response=>{
            console.log('Login Success',response)
            authenticate(response,()=>{
                setValues({...values,username:'',password:'',buttonText:'Submitted'})
                //toast.success(`Hey ${response.data.userExist.name}, Welcome back`);
                isAuth() && isAuth().role==='admin'?navigate('/admin'):navigate('/private')
            
        })
            
    }).catch(error=>{
        console.log('Signin Error',error.response.data)
        setValues({...values,buttonText:'Submit'})
        toast.error(error.response.data.error)

    })


    }
    return (
        
        <div className='col-md-6 offset-md-3'>
            <ToastContainer/>   
            {isAuth()   ? navigate('/'):null }

            <h1 className='p5 text-center'>Signin</h1>
            <form>
                <div className='form-group'>
                    <label className='text-muted'>Username</label>
                    <input onChange={handleChange('username')} value={username} type='text' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} value={password} type='password' className='form-control'/>
                </div>
                <p><NavLink to="/auth/password/forgot" class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Forgot Password??</NavLink></p>

                <div>
                    <button  className='btn btn-primary' onClick={clickSubmit}>{values.buttonText}</button>
                </div>

            </form>


            
        </div>
    );
};

export default Signin;