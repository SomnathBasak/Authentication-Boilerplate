import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Submit'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Submitted' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data.error);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request Reset Mail' });
            });
    };


    return (
       
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Forgot password</h1>
                <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    Submit
                </button>
            </div>
        </form>
            </div>
    );
};

export default ForgotPassword;
