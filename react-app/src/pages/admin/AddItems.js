import React from 'react'
import AdminLayout from '../../components/adminLayout'
import "../../stylesheets/additems.css"
import db from '../../fireconfig';
import { doc, setDoc,addDoc,updateDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

function AddItems() {
  const navigate = useNavigate();
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
      navigate(`/admin`,{state:{status:1}})
      return( <></> )
    }
  },[authentication.currentUser])

  const [details, setDetails] = useState({
    category: "",
    name: "",
    count: "",
    description:"",
    imageURL:"",
});

  const handleChange = (e) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    addDoc(collection(db, "products"), { 
      name:details.name,
      category:details.category,
      count:details.count,
      description:details.description,
      imageURL:details.imageURL,
  })

    .then(()=>{
      alert("component is added to DB");
    })
    .catch((error)=>{
      alert(error.message);
    })
    setDetails({
      name: "",
      category: "",
      count: "",
      description:"",
      imageURL:"",
  });
  }
  return (
    <AdminLayout>
    <form className='form1'>
      <h1>Add Here</h1>
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

      <button type="submit" onClick={handleSubmit}>ADD TO DB</button>
    </form>

    </AdminLayout>
  )
}

export default AddItems