import React from 'react'
import{FaBars} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import img1 from '../img/logo1.jpg'
import { Button } from '@mantine/core';
// import {useAuth} from '../contexts/AuthContext'
import {auth} from '../fireconfig'
import { signOut } from 'firebase/auth';

function adminLayout(props) {
    // const authentication = useAuth()
    function handleLogout(){
        // authentication.logout()
        signOut(auth)
    }
  return (
    <div >
        <nav className="navbar navbar-expand-lg navbar-light py-2 custom-nav">
            <div className="container-fluid">
            <img src={img1} alt="" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto ">
                <li className="nav-item" >
                    <Link className="nav-link cus-col" to="/admin/orders">Order list</Link>
                    
                </li>
                <li className="nav-item" >
                    <Link className="nav-link cus-col" to="/admin/returns">Return list</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link cus-col" to="/admin/additems">Add/remove items</Link>
                </li>
                <li className="nav-item " >
                    <Link className="nav-link cus-col" to="/">Fine List</Link>
                </li>
                <li className="nav-item " >
                    <Link className="nav-link cus-col" to="/admin">History</Link>
                </li>
                <li className="nav-item " >
                    {/* <Link className="nav-link cus-col" to="/admin">History</Link> */}
                    <Button variant="outline" color="yellow" onClick={handleLogout}>
                      Logout 
                    </Button>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        <div>
            {props.children}
        </div>
    </div>
  )
}

export default adminLayout