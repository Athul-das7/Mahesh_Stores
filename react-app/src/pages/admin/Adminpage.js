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
    // console.log('hey yah', authentication.currentUser.uid)
    const [status,setStatus] = useState(()=>{ 
        // if ( props.status === undefined || props.status === -1 )
        if ( location.state === null || location.state.status === null )
        return -1 
        else return location.state.status
    });

    useEffect(()=>{
        authentication.checkUser()
    },[])
    // console.log('hey yah', authentication.currentUser.uid)
    // if ( location.state && location.state.status ){
    //  setStatus(location.state.status)
    // }
    // const [auth,setAuth] = useState(false)
    const emailField = useRef()
    const passwordField = useRef()
    // var status = props.status;
    // status = props.status
    // console.log('props',location.state.id)
    // console.log(emailField.current.value)
    // console.log(test)

    async function handleSubmit(e){
        e.preventDefault();
        const email = emailField.current.value
        const password = passwordField.current.value
        try{
            await authentication.login(email, password)
            // const user = await authentication.login(email, password)
            await authentication.checkUser()
            console.log('wow',authentication.currentUser.uid)
            // const a = await authentication.check()
            // console.log("wonderful",authentication.currentUser.uid)
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    }
                };
            axios.post('http://localhost:5000/admin/login',{uid:authentication.currentUser.uid},axiosConfig)
                .then(res=>{
                    // alert('login success')
                    console.log('data',res.data)
                    if ( res.data === true ) {
                        // setAuth(true)
                        navigate(`/admin/orders`)
                    }
                    else{
                        // navigate(`/admin`,{status:0})
                        setStatus(0);
                    }

                })
                .catch(err=>{
                    console.log(err)
                })
        }
        catch{
            setStatus(0);
        }
        // console.log(authentication.currentUser.uid);
        // const user = {
        //     email: email,
        //     password: password
        // }

        // console.log(user)
        // alert(password)

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         "Access-Control-Allow-Origin": "*",
        //         }
        //     };
        // axios.post('http://localhost:5000/admin/login',user,axiosConfig)
        //     .then(res=>{
        //         // alert('login success')
        //         console.log('data',res.data)
        //         if ( res.data === true ) {
        //             setAuth(true)
        //             navigate(`/admin/orders`,{auth:auth})
        //         }
        //         else{
        //             // navigate(`/admin`,{status:0})
        //             setStatus(0);
        //         }

        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        emailField.current.value = null
        passwordField.current.value = null
        // console.log(user)
        // alert(password)
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
                        <input ref={emailField} placeholdertype="email" class="form-control" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3 pad">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input ref={passwordField} type="password" class="form-control" placeholder="Password" name="password"/>
                    </div>
                    <div className="mb-3 form-check pad2">
                        <button type="submit" className="btn btn-success btn-block pad">Submit</button>
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