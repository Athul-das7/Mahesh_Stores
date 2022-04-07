import React from 'react'
import Layout from '../components/Layout'
import { FaBeer } from 'react-icons/fa';
import { useSelector } from 'react-redux';



function Cartpage() {

  const {cartItems} = useSelector(state=>state.cartReducer);
  
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
          <td><FaBeer size={15}/></td>
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