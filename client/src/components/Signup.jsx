import React, { useState } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuth, signout } from './Helpers';


const Signup = () => {
    const [values,setValues]=useState({
        name:'Somnath Basak',email:'somnathbasak66@gmail.com',username:'somnath66',password:'12345',cpassword:'12345',buttonText:'Submit'
    })
    const{name,email,username,password,cpassword}=values;
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})

    }
    const clickSubmit=event=>{
        event.preventDefault();
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:"POST",
            url:`${import.meta.env.VITE_REACT_APP_API}/signup`,
            data:{name,email,username,password,cpassword}
        }).then(response=>{
            console.log('Signup Success',response)
        setValues({...values,name:'',email:'',username:'',password:'',cpassword:'',buttonText:'Submitted'})
        toast.success(response.data.message)    
    }).catch(error=>{
        console.log('Signup Error',error.response.data)
        setValues({...values,buttonText:'Submit'})
        toast.error(error.response.data.error)

    })


    }
    return (
        
        <div className='col-md-6 offset-md-3'>
            <ToastContainer/>   
            {isAuth()  ? navigate('/'):null }
            <h1 className='p5 text-center'>Signup</h1>
            <form>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} value={name} type='text' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} value={email} type='text' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Username</label>
                    <input onChange={handleChange('username')} value={username} type='email' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} value={password} type='password' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Confirm Password</label>
                    <input onChange={handleChange('cpassword')} value={cpassword} type='password' className='form-control'/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={clickSubmit}>{values.buttonText}</button>
                </div>

            </form>


            
        </div>
    );
};

export default Signup;