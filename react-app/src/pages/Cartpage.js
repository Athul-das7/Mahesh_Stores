import React from 'react'
import { useSelector } from 'react-redux';
import Layout from '../components/Layout'
import { FaBeer } from 'react-icons/fa';

function Cartpage() {

  const {cartItems} = useSelector(state=>state.cartReducer);

  return (
    <Layout>
        <table className='table mt-2'>

         <thread>
         <tr>
            
          </tr> 
         </thread>

         <tbody>
           <th>Image</th>
            <th>Name</th>
            <th>delete</th>
           {cartItems.map(item=>{
          
          return <tr>
            
          <td><img src={item.imageURL} height="40" width="40"/></td>
          <td>{item.name}</td>
          <td><FaBeer /></td>
          
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