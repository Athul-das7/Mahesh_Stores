import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout'


function Cartpage() {

  const {cartItems} = useSelector(state=>state.cartReducer);

  return (
    <Layout>
        <table className='table mt-2'>

         <thread>
         <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>action</th>
          </tr> 
         </thread>

         <tbody>
           
           {cartItems.map(item=>{
          
          return <tr>
          <td><img src={item.imageURL} height="40" width="40"/></td>
          <td>{item.name}</td>
          <td>{FaTrash}</td>
          </tr>

           }
           )
          }
         </tbody>
          </table>
    </Layout>
  )
}

export default Cartpage;