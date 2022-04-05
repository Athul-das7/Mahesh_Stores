import React from 'react'
import Footer from './Footer'
import{BiLogIn} from 'react-icons/fa'

function HomeLayout(props) {
  return (
    <div className='header'>
        <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
            <div class="container">
                <span class="navbar-brand h1">Mahesh Stores</span>
                <button 
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="#navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-auto">  
                        <li class="nav-item active">
                            <a href="#" class="nav-link active">Home</a>
                        </li>
                        <li class="nav-item active">
                            <a href="#" class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item active">
                            <a href="#" class="nav-link">FAQ</a>
                        </li>
                        <li class="nav-item active">
                            <a href="#" class="nav-link">Contact Us</a>
                        </li>  
                    </ul>
                    <ul class="nav navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/login">
                                <span class="glyphicon glyphicon-log-in">Admin</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>        
        </nav>     /*end of navigation bar */ 

        <div>
            {props.children}
        </div>

        <Footer></Footer>
      
    </div>
  )
}


export default HomeLayout

