import React from 'react'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../fireconfig';
import { fireproducts } from '../mahesh_stores-products';
import {useNavigate} from 'react-router-dom'
function Homepage() {

  const [searchkey , setSearchkey]=useState([]);
  const[filterType, setFilterType]=useState([]);
  // async function adddata(){
  //   try{
  //     await addDoc(collection(fireDB, "users"),{name:'greshu',age:18})
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
    const [products,setproducts]=useState([]);
    const navigate=useNavigate()
    useEffect(() => {
      getdata()
    },[])
    async function getdata(){
      try{
        const users=await getDocs(collection(fireDB, "products"));
        const productsArray=[]
        users.forEach((doc) => {
          const obj={
            id:doc.id,
            ...doc.data()
          }
          productsArray.push(obj)
          //console.log(doc.id, " => ", doc.data());
        });
        setproducts(productsArray)
        //console.log(productsArray)
        }catch(error){
        console.log(error)
      }
    }

    //adding data to data base at a time using mahesh_store-product.js

      // async function addProductsData(){
      //   fireproducts.map(async(product) =>{
      //     try{
      //       await addDoc(collection(fireDB, "products"),product);
      //     }       catch(error){
      //     console.log(error)
      //   }
      //   })
      // }

     //<button onClick={addProductsData}>add data to FB</button> -->keep it Layout if needed to add components
      //<button onClick={adddata}>add data to fire base</button>
      //    <button onClick={getdata}>get data from DB</button>
  return (
        <Layout>
            <div className="container">
                <div className='d-flex justify-content-evenly m-2'>
                          <div >Starting Date:9/1/22</div>
                          <div >Ending Date:19/1/22</div>
                </div>
                <div className='d-flex w-50 justify-content-evenly'>
                  <input type="text" 
                  value={searchkey}
                  onChange={(e) => {setSearchkey(e.target.value)}}
                  className='form-cntrol' placeholder='search Component'/>
                  <select className='form-control' value={filterType}
                  onChange={(e) => {setFilterType(e.target.value)}}>
                    <option value="">All Categories</option>
                    <option value="embedded">Embedded</option>
                    <option value="sensors">Sensors</option>
                    <option value="general">General</option>
                  </select>
                  
                </div>

                
              <div className='row'>
                      <h3 className='main_heading'>Components</h3>
                      <hr />
                  {products.filter((obj) => obj.name.toLowerCase().includes(searchkey))
                  .filter((obj) => obj.category.toLowerCase().includes(filterType)).map((product) => {
                    
                        return <div className='col-md-4'>

                            <div className='m-2 p-1 product position-relative'>

                              <div className='product-content'>
                                  <div className='text-center'>
                                      <p>{product.name}</p>
                                      <img src={product.imageURL} alt="" className='product-img'/>
                                  </div>
                              </div>
                              <div className='product-actions'>
                                  <div className="d-flex">
                                      <button className='mx-2'>ADD TO CART</button>
                                      <button onClick={() => {
                                        navigate(`/productinfo/${product.id}`)
                                      }}>DESCRIPTION</button>
                                  </div>
                              </div>
                              
                            </div>
                        </div>

                  })}
              </div>
            
            </div>
            
            
        </Layout>
  )
};

export default Homepage ;