import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// import {useHistory} from 'react-router-dom'
import AdminLayout from '../../components/adminLayout'
import Rows from './Rows'
// import { Route, Redirect } from 'react-router'


function Ordered(props) {
  const navigate = useNavigate()
  // const history = useHistory()
  const [page, setPage] = useState('ordered')
  // console.log(page);
  const [datas,setData] = useState([])

  useEffect(()=>{ 
    getData(page);
  },[page])

  function getData (data){
    fetch(`http://localhost:5000/admin/${data}`)
      .then(response => response.json())
      .then(json=>setData(json))
    console.log(page);
  }

  console.log(props.auth);
  function test(){
    // history.push('/')
    navigate('/admin',{state:{id:1}})
  }

  // if ( props.auth === true ){
    return (
        <AdminLayout>
          <button onClick={test}>orders</button>
          <button onClick={() => setPage('returned')}>returns</button>
          <Rows elements={datas}></Rows>
        </AdminLayout>
    )
  // }
  // else {
  //   return(
  //   navigate(`/admin`,{status:1})
  //   )
  // }
}

export default Ordered