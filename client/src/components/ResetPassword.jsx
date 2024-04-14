import React, { useState, useEffect } from 'react';
//import jwt from 'jsonwebtoken';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const params=useParams();
    // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        password: '',
        cpassword:'',
        buttonText: 'Reset password'
    });

    useEffect(() => {
        let token = params.token;
        let {name}  = jwtDecode(token)
        //console.log(password);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, password,cpassword, buttonText } = values;

    const handleChange = name=>event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = async(e) => {
        e.preventDefault();
            setValues({ ...values, buttonText: 'Submitting' });
        await axios({
            method: "PUT",
            url: `${import.meta.env.VITE_REACT_APP_API}/reset-password`,
            data: { password,cpassword,token }
            }).then((res)=>{
                console.log(res);
                toast.success(res.data.message)
            }).catch((err)=>{
                console.log(err);
                toast.error(err.response.data.error)
            })  
        
        
    }
    
        



    return (
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hi {name}, Please Reset Your Password</h1>
                <form>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm New Password</label>
                <input onChange={handleChange('cpassword')} value={cpassword} type="password" className="form-control" required />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
            </div>
    );
};

export default ResetPassword;
