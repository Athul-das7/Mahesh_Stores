import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../../fireconfig';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'


function RemoveItem() {
  const authentication = useAuth()
  const cng = async ()=>{
      await authentication.changeuser();
  }
  cng()
  useEffect(() => {
    if ( authentication.currentUser === null ){//&& authentication.currentUser.uid === undefined ) {
      // console.log('current',current.uid)
      // if (true){
      //  return <Redirect to='/admin'  />
      if ( authentication.status === 1 ) authentication.setStatus(1);
      else authentication.setStatus(2)
      navigate(`/`)
      return( <></> )
    }
  },[authentication.currentUser])

  const [products,setproducts]=useState([]);
  const navigate=useNavigate();
  const [searchkey , setSearchkey]=useState([]);
  const[filterType, setFilterType]=useState("");

  
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

  return (
    <AdminLayout>
    
            <div className="container">
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
                                      <button onClick={() => {
                                        navigate(`/productupdate/${product.id}`)
                                      }}>UPDATE</button>
                                  </div>
                              </div>
                              
                            </div>
                        </div>

                  })}
              </div>
            
            </div>
            
    </AdminLayout>
  )
}

export default RemoveItem