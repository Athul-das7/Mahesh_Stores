import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AdminLayout from '../../components/adminLayout'
import Rows from './Rows'


function Ordered(props) {
  const location = useLocation()
  const navigate = useNavigate()
  // console.log('location',location.state.user)
  // try{
  //   if ( location.state === undefined || location.state.user === undefined ) {
  //     navigate(`/admin`,{state:{status:1}})
  //   }
  // }
  // catch{
  //     navigate(`/admin`,{state:{status:1}})
  // }
  // const history = useHistory()
  const [page, setPage] = useState('ordered')
  // console.log(page);
  const [datas,setData] = useState([])

  useEffect(()=>{ 
    getData(page);
  },[])

  function getData (data){
    fetch(`http://localhost:5000/admin/${data}`)
      .then(response => response.json())
      .then(json=>setData(json))
    console.log(page);
  }

  // console.log(props.auth);

  // if ( props.auth === true ){
    return (
        <AdminLayout>
          <h1 className="title-order">Order List</h1>
          {/* <button onClick={test}>orders</button>
          <button onClick={() => setPage('returned')}>returns</button> */}
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