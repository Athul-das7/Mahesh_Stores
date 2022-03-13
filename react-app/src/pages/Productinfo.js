import React from 'react'
import Layout from '../components/Layout'
import {getDoc,doc } from "firebase/firestore"; 
import fireDB from '../fireconfig';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
function Productinfo() {
  const [product,setproduct]=useState([])
  const params=useParams();
    useEffect(() => {
      getdata()
    },[]);

    async function getdata(){
      try{
        const productTemp=await getDoc(doc(fireDB,"products",params.productid));
        
        setproduct(productTemp.data());
        //console.log(productsArray)
        }catch(error){
        console.log(error)
      }
    }


  return (
    <Layout>
        <h1 className='product-name'>Component Description</h1>
        <div className='row justify-content-center'>
        <div className="col-md-8">
        {product && (<div>
                <p className='product-name'><b>{product.name}</b></p>
                <img src={product.imageURL} alt="" className='product-info-img'/>
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                      <button>ADD TO CART</button>
                </div>
        </div>)}
        </div>
        </div>
    </Layout> 
  )
}

export default Productinfo