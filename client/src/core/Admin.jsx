import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuth, getCookie, signout } from '../components/Helpers';
import { useNavigate } from 'react-router-dom';


const Admin = () => {

    
    const navigate=useNavigate();
    const [values,setValues]=useState({
        role:'',name:'',email:'',username:'',password:'',buttonText:'Submit'
    })
    

    const token=getCookie('token');
    
        useEffect(()=>{
            loadProfile();
        },[])

        const loadProfile=async()=>{
            try {
                const response=await axios({
                    method:"GET",
                    url:`${import.meta.env.VITE_REACT_APP_API}/user/${isAuth().id}`,
                    headers:{Authorization:`${token}`}
                })
                if(response){
                    const {role,name,email,username}=response.data.user
                    console.log(response.data.user);
                    setValues({...values,role,name,email,username})
                    console.log(error.response);
                }
            }
            catch(error){
                if(error.response.data.user.status===401){
                    signout(()=>{
                       navigate('/')
                    })
                }
            } 
            }
            
        const{role,name,email,username,password}=values;
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})

    }
    const clickSubmit=event=>{
        event.preventDefault();
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:"PUT",
            url:`${import.meta.env.VITE_REACT_APP_API}/admin/update`,
            headers:{Authorization:`${token}`},
            data:{name,password}
        }).then(response=>{
            console.log('Profile Update Successfully',response)
        setValues({...values,buttonText:'Submitted'})
        toast.success('Profile Update Successfully')    
    }).catch(error=>{
        console.log('Updation Error',error.response.data)
        setValues({...values,buttonText:'Submit'})
        toast.error(error.response.data.error)

    })


    }
    return (
        
        <div className='col-md-6 offset-md-3'>
            <ToastContainer/>   
            <h1 className='p5 text-center'>Admin Profile Update</h1>
            <form>
            <div className='form-group'>
                    <label className='text-muted'>Role</label>
                    <input  defaultValue={role} type='text' className='form-control' disabled/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} value={name} type='text' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input  defaultValue={email} type='text' className='form-control' disabled/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Username</label>
                    <input defaultValue={username} type='email' className='form-control' disabled/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} value={password} type='password' className='form-control'/>
                </div>                
                <div>
                    <button className='btn btn-primary' onClick={clickSubmit}>{values.buttonText}</button>
                </div>

            </form>


            
        </div>
    );
};

export default Admin;