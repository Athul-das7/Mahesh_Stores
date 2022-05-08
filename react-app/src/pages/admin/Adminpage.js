import React from 'react'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import Layout from '../../components/Admin'
import Alert from './Alert'
import {useAuth} from '../../contexts/AuthContext'
import axios from 'axios'

function Adminpage() {
    const navigate = useNavigate()
    const location = useLocation()
    const authentication = useAuth()
    const [btnState, setBtnState] = useState(false)

    useEffect(() => {
        try{
            console.log('first');
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    }
                };
            axios.post('/admin/login',{uid:authentication.currentUser.uid},axiosConfig)
                .then(res=>{
                    emailField.current.value = null
                    passwordField.current.value = null
                    // alert('login success')
                    console.log('data',res.data)
                    if ( res.data === true ) {
                        navigate(`/admin/orders`)
                    }
                    else{
                        setStatus(0);
                    }

                })
                .catch(err=>{
                    console.log('so many bloody errors')
                })
        }
        catch(e){
            console.log(e);
            setStatus(0);
        }

    },[authentication.currentUser])


    const [status,setStatus] = useState(()=>{ 
        if ( location.state === null || location.state.status === null )
            return -1 
        else return location.state.status
    });

    const emailField = useRef()
    const passwordField = useRef()

    function handleSubmit(e){
        setBtnState(true)
        e.preventDefault();
        const email = emailField.current.value
        const password = passwordField.current.value
        try{
            authentication.login(email, password)
        }
        catch(e){
            console.log(e);
            setStatus(0);
        }
    
        // for( var i = 0; i < 900000000000000000000; i ++);
        setBtnState(false)
    }
    
    return (
    <Layout>
    <div className="container-fluid bg">
        <div className="row">
            <div className="col-md-4 col-sm-2 col-xs-12"></div>
            <div className="col-md-4 col-sm-8 col-xs-12">
                <form className="form-container login-form" onSubmit={handleSubmit}>
                    <h1 className="pad">Admin Login Page</h1>
                      <Alert status={status}/>
                    <div className="mb-3 pad"> 
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input ref={emailField} placeholdertype="email" className="form-control" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3 pad">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input ref={passwordField} type="password" className="form-control" placeholder="Password" name="password"/>
                    </div>
                    <div className="mb-3 form-check pad2">
                        <button disabled={btnState} type="submit" className="btn btn-success btn-block pad">Submit</button>
                    </div>
                </form> 
            </div>
            <div className="col-md-4 col-sm-2 col-xs-12"></div>
        </div>
    </div>
    </Layout>
  )
}

export default Adminpage