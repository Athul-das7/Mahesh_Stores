import React from 'react'
import AdminLayout from '../../components/adminLayout'
import {getDoc,doc } from "firebase/firestore"; 
import fireDB from '../../fireconfig';
import  { useEffect, useState } from 'react'
import { Navigate, useParams,useNavigate } from 'react-router-dom';
import "../../stylesheets/additems.css"
import db from '../../fireconfig';
import {setDoc,addDoc,updateDoc,deleteDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
function Productupdate() {
    const navigate = useNavigate();
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

    const [details, setDetails] = useState({
        category: "",
            name:"",
            count:"",
            description:"",
            imageURL:"",
    });
    
      const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value,
        });
      };
      const handleSubmit1=(e)=>{
        deleteDoc(doc(db, "products",params.productid))
        .then(()=>{
            alert("component is deleted");
          })
          .catch((error)=>{
            alert(error.message);
          })
          navigate("../")
      }

      const handleSubmit=(e)=>{
          console.log(details)
        e.preventDefault();
        updateDoc(doc(fireDB,"products",params.productid),{
            name:details.name,
          category:details.category,
          count:details.count,
          description:details.description,
          imageURL:details.imageURL,
          })
        .then(()=>{
          alert("component is updated ");
        })
        .catch((error)=>{
          alert(error.message);
        })
        setDetails({
            category: "",
            name:"",
            count:"",
            description:"",
            imageURL:"",
      });
      navigate("../")
    }
  return (
    <AdminLayout>
        {/* <h1 className='product-name'>Component Description</h1> */}
        <div className='row justify-content-center'>
        <div className="col-md-8">
        {/* {product && (<div>
                <p className='product-name'><b>{product.name}</b></p>
                <img src={product.imageURL} alt="" className='product-info-img'/>
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                      <button>ADD TO CART</button>
                </div>
        </div>)} */}
        <h1 className='product-name'><b>Component : {product.name}</b></h1>
        <form className='form1'>
      <h1>update data</h1>
      <label>Category</label>
      <input placeholder='Category'
      type="text"
      id="category"
      value={details.category}
      onChange={handleChange}
      name="category"
      />
      

      <label>Name</label>
      
      <input placeholder='Component Name'
      type="text"
      id="name"
      value={details.name}
      onChange={handleChange}
      name="name"
      // onchange={(e) =>setName(e.target.value)}
      />

      <label>Count</label>
      <input placeholder='Components Count'
      type="text"
      id="count"
      value={details.count}
      onChange={handleChange}
      name="count"/>

      <label>description</label>
      <textarea placeholder='component Description'
      type="text"
      id="description"
      value={details.description}
      onChange={handleChange}
      name="description"/>

      <label>Image URL</label>
      <textarea placeholder='Image URL'
      type="text"
      id="imageURL"
      value={details.imageURL}
      onChange={handleChange}
      name="imageURL"/>

      <button type="submit" onClick={handleSubmit}>UPDATE DB</button>
      <button type="submit" onClick={handleSubmit1}>DELETE COMPONENT</button>
    </form>
        </div>
        </div>
    </AdminLayout> 
  )
}

export default Productupdate