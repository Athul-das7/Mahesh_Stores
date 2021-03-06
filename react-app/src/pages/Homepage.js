import React from 'react'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../fireconfig';
import { fireproducts } from '../mahesh_stores-products';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';


function Homepage() {
  

  const location = useLocation();
  const navigate=useNavigate();
  console.log("location state",location.state);
  
  try {
    let {start,end, category} = location.state
  }
  catch{
    navigate('/');
    // return (<></>)
  }
  let {start,end, category} = location.state
  //console.log(start, end, category);
  localStorage.setItem('startDate',start);
  localStorage.setItem('endDate',end);
  const [products,setproducts]=useState([]);

  const [searchkey , setSearchkey]=useState([]);
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cartReducer);
  const[filterType, setFilterType]=useState(category);

  // async function adddata(){
  //   try{
  //     await addDoc(collection(fireDB, "users"),{name:'greshu',age:18})
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
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


       useEffect(()=>{
         localStorage.setItem('cartItems', JSON.stringify(cartItems));
       },[cartItems])
      const addToCart=(product)=>{
         
        dispatch({type: "ADD_TO_CART", payload: product});
      }
  return (
        <Layout>
            <div className="container">
                <div className='d-flex justify-content-evenly m-2'>
                          <div id='date'>Starting Date : {start.getDate()}/{start.getMonth()+1}/{start.getFullYear().toString()}</div>
                          <div id='date'>End Date : {end.getDate()}/{end.getMonth()+1}/{end.getFullYear().toString()}</div>
                </div>
                <div className='d-flex w-50 justify-content-evenly'>
                  <input type="text" 
                  value={searchkey}
                  onChange={(e) => {setSearchkey(e.target.value)}}
                  className='form-cntrol' placeholder='search Component'/>
                  <select className='form-control' value={filterType}
                  onChange={(e) => {setFilterType(e.target.value)}}>
                    <option className='form-control' value="">All Categories</option>
                    <option className='form-control' value="embedded">Embedded</option>
                    <option className='form-control' value="sensors">Sensors</option>
                    <option className='form-control' value="general">General</option>
                  </select>
                  
                </div>

                
              <div className='row'>

                    <h3 className='main_heading'>Components</h3>
                      <hr className='main_heading1'></hr>
              
                      
                  {products.filter((obj) => obj.name.toLowerCase().includes(searchkey)).filter((obj)=>obj.count > 0)
                  .filter((obj) => obj.category.toLowerCase().includes(filterType)).map((product) => {
                    
                        return <div className='col-md-4'>

                            <div className='m-2 p-1 product position-relative'>

                              <div className='product-content'>
                                  <div className='text-center'>
                                      <p className='form-control'>{product.name}</p>
                                      <img src={product.imageURL} alt="" className='product-img'/>
                                  </div>
                              </div>
                              <div className='product-actions'>
                                  <div className="d-flex">
                                      <button className='mx-2' onClick={()=>addToCart(product)}>ADD TO CART</button>
                                      {/* hello world */}
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