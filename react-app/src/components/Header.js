import React from 'react'
import img1 from '../img/logo1.jpg';
import {Link} from 'react-router-dom';
import{FaBars} from 'react-icons/fa'
import { useSelector } from 'react-redux';
function Header() {
    const{cartItems}=useSelector(state=>state.cartReducer)
  return (
    <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light  py-2">
            <div className="container-fluid">
            <img src={img1} alt="" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><FaBars size={25} color='white'/></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item " >
                    <Link className="nav-link"to="/">Home</Link>
                    
                </li>
                <li className="nav-item" >
                    <Link className="nav-link" to="/">Abort</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/">Contact US</Link>
                </li>
                <li className="nav-item " >
                    <Link className="nav-link" to="/cart">Cart {cartItems.length}</Link>
                </li>
                <li className="nav-item " >
                    <Link className="nav-link" to="/admin" >Admin</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
  )
}

export default Header