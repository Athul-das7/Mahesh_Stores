import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaBeer } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { Component }  from 'react';
import db from '../fireconfig';
import { collection, query, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { doc, setDoc,addDoc } from "firebase/firestore";
import {Navigate, useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";



function Cartpage() {
  var arr = []
  const navigate = useNavigate();
  
  const [details, setDetails] = useState({
    name: "",
    email: "",
    rollNo: "",
    phone:"",
});

const st = localStorage.getItem('startDate');
const end = localStorage.getItem('endDate');

const handleChange = (e) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
};



const handleSubmit = async (v) => {
  console.log(st);
    console.log('details',details);
   console.log(arr)
    
    await addDoc(collection(db, "transactions"), {
        // name: details.name,
        // email: details.email,
        // roll: details.roll,
        // mobile:details.mobile,
        status:0,
        user:details,
        start_date:st,
        end_date:end,
        cartComponents:arr,
    });

    
    setDetails({
        name: "",
        email: "",
        rollNo: "",
        phone:"",
    });


  localStorage.clear();
  window.alert("Order Placed,confirmation due contact administrator")
  navigate('../')
  
  
 };

  

  const {cartItems} = useSelector(state=>state.cartReducer);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems]);

  // console.log(cartItems[0].name);
  // console.log(cartItems[1].name);

  cartItems.forEach(item=>{
    arr.push(item.name);
  })
  
  // console.log(arr)
  const deleteFromCart=(product)=>{
         
    dispatch({type: "DELETE_FROM_CART", payload: product});
  }

  return (
    
    <Layout>

        <table className='table'>
        
         <thread>
      
         </thread>

         <tbody>
           
         <tr>
            <th>Image</th>
            <th>Name</th>
            <th>action</th>
          </tr> 
          
           {cartItems.map(item=>{
          
          return <tr>
          <td><img src={item.imageURL} height="40" width="40"/></td>
          <td>{item.name}</td>
          <td><FaBeer size={15} onClick={()=>deleteFromCart(item)}/></td>
          </tr>

           }
           )
          }
         </tbody>
          </table>

        <button type="button" className="btn btn-primary" data-bs-target="#mymodal" data-bs-toggle="modal">submit</button>
        
        
        <div className="modal" id="mymodal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Details</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                  <form>
                    <div className='mb-3'>
                      <label className="form-label required">Name</label>
                      <input
                                    type="text"
                                    id="name"
                                    value={details.name}
                                    onChange={handleChange}
                                    name="name" />
                    </div>
                    <div className='mb-3'>
                      <label className="form-label required">roll no</label>
                      <input
                                    type="text"
                                    value={details.rollNo}
                                    onChange={handleChange}
                                    id="rollNo"
                                    name="rollNo" />
                    </div>
                    <div className='mb-3'>
                      <label className="form-label required">Email</label>
                      <input
                                    type="email"
                                    value={details.email}
                                    onChange={handleChange}
                                    id="email"
                                    name="email"/>
                    </div>
                    <div className='mb-3'>
                      <label className="form-label required">Mobile Number</label>
                      <input
                                    type="text"
                                    value={details.phone}
                                    onChange={handleChange}
                                    id="phone"
                                    name="phone"/>
                    </div>
                    
                  </form>
                  <div className='modal-footer'>
                      <button type="submit" onClick={handleSubmit} class="btn-btn-primary">Submit</button>
                      <button type="submit" class="btn-btn-danger">cancel</button>
                  </div>
              </div>
            </div>

          </div>
        </div>

    </Layout>
  )
}

export default Cartpage;