import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaBeer } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { Component }  from 'react';


function Cartpage() {

  const {cartItems} = useSelector(state=>state.cartReducer);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems]);

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

        <h1>cart</h1>

    </Layout>
  )
}

export default Cartpage;