import React from 'react'
import {getDoc,doc } from "firebase/firestore"; 
import fireDB from '../fireconfig';
import  { useEffect, useState } from 'react'
import { Navigate, useParams,useNavigate } from 'react-router-dom';
import '../stylesheets/finalPayment.css'
import Layout from '../components/Layout';
function FinalPayment() {
    const navigate = useNavigate();
    const navigate1=useNavigate();
    const [product,setproduct]=useState([])
  const params=useParams();
    useEffect(() => {
      getdata()
    },[]);

    var p=''
    async function getdata(){
      try{
        const productTemp=await getDoc(doc(fireDB,"fines",params.rollNo));
        
        setproduct(productTemp.data());
        //console.log(productsArray)
        p=productTemp.data.name;
        }catch(error){
        console.log(error)
      }
    }
    

 
  return (


      <Layout>
        
   <div className='final'>
       <h1 className='pd'>Payment Details</h1>
     <table className='paymentTable'>
<tr>
<th className='th1'>Name :</th>
<td className='td1'>{product.name}</td>
</tr>
<tr>
<th className='th1'>Roll Number :</th>
<td className='td1'>{product.rollNo}</td>
</tr>
<tr>
<th className='th1'>phone Number :</th>
<td className='td1'>{product.phone}</td>
</tr>
<tr>
<th className='th1'>Fine Amount :</th>
<td className='td1'>{product.fine} RS</td>
</tr>
</table>
<div class="d-flex justify-content-center">
  <div class="p-2 bd-highlight">
      <button onClick={() => {
        navigate(`/gateway`)
        }}>Pay Now</button>
  </div>
  <div class="p-2 bd-highlight">
  <button onClick={() => {
        navigate(`/`)
        }}>Cancel</button>
  </div>
</div>

   </div>
   </Layout>
  )
}

export default FinalPayment