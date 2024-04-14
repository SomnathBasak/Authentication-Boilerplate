import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { isAuth, signout } from '../components/Helpers';




const Navbar = () => {
    let navigate = useNavigate();

    return (
        <div>
         <ul className='nav nav-tabs bg-primary'>
               <li className='nav-item'>
                <NavLink to="/" className='text-dark nav-link'>Home</NavLink>
                </li>

                {!isAuth() && (
                    <>
                    <li className='nav-item'>
                    <NavLink to="/signup" className='text-dark nav-link'>Signup</NavLink>
                    </li>
                   <li className='nav-item'>
                    <NavLink to="/signin" className='text-dark nav-link'>Signin</NavLink>
                    </li> 
                    </>

                )}

{isAuth() && isAuth().role==='admin' &&(
                    <>
                    <li className='nav-item'>
                        <NavLink to='/admin' className='text-dark nav-link'>{isAuth().name}</NavLink>
                    </li>
                    </>
                )}
{isAuth() && isAuth().role==='subscriber' &&(
                    <>
                    <li className='nav-item'>
                        <NavLink to='/private' className='text-dark nav-link'>{isAuth().name}</NavLink>
                    </li>
                    </>
                )}

                {isAuth() &&(
                    <>
                    <li className='nav-item'>
                        <span 
                        className='text-dark nav-link'
                        style={{cursor:'pointer',color:'#fff'}} onClick={()=>{
                            signout(()=>{
                                navigate('/')

                            })
                        }}>Signout</span>
                    </li>
                    </>
                )}
         </ul>
      
        </div>
    );
};

export default Navbar;

