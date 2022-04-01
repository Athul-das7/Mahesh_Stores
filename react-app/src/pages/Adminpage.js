import React from 'react'
import Layout from '../components/Admin'
import Alert from './Alert'

function Adminpage(props) {
  return (
    <Layout>
    <div className="container-fluid bg">
        <div className="row">
            <div className="col-md-4 col-sm-2 col-xs-12"></div>
            <div className="col-md-4 col-sm-8 col-xs-12">
                <form className="form-container" action="http://localhost:5000/admin/login" method="POST">
                    <h1 className="pad">Admin Login Page</h1>
                      <Alert status={props.status}/>
                        <div className="mb-3 pad"> <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3 pad">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
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