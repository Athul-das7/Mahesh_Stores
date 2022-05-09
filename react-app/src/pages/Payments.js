import React, { useState } from 'react'
import Layout from '../components/Layout'
import {Navigate, useNavigate} from 'react-router-dom'

function Payments() {

    const navigate = useNavigate();
    const [rollNo,setRollNo]=useState("");
    const handleChange = (e) => {
        setRollNo(e.target.value)
      };
  return (
      <Layout>
    <form className='form1'>
    <h1>Check Payment Dues</h1>
    <label>Roll Number</label>
    <input placeholder='rollNo'
    value={rollNo}
    onChange={handleChange}
    type="text"
    id="rollNo"
    name="rollNo"
    />
    


    <button onClick={() => {
      
        navigate(`/FinalPayment/${rollNo}`)
        }}>CHECK</button>
  </form>
  </Layout>
  )
}

export default Payments