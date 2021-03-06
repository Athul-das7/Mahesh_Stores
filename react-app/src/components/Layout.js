import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  return (
    <div>
        <Header/>
        <div className="content test">
            {props.children}
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Layout