import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import ReturnRows from './ReturnRows'
import {useAuth} from '../../contexts/AuthContext'
import { FaLevelDownAlt } from 'react-icons/fa'
import axios from 'axios'


function Returned() {
  const location = useLocation()
  const navigate = useNavigate()
  // console.log('location',location.state.user)
  // try{
    // if ( location.state === null || location.state.user === null ) {
    //   navigate(`/admin`,{state:{status:1}})
    // }
  // }
  // catch{
  //     navigate(`/admin`,{state:{status:1}})
  // }
  // const history = useHistory()
  // const [page, setPage] = useState('ordered')
  // console.log(page);
  const [datas,setData] = useState([])
  // const authentication = useAuth()
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
      navigate(`/admin`)
      return( <></> )
    }
  },[authentication.currentUser])
  console.log('ordered', authentication.currentUser)

  // useEffect(() => {
  //   setData(location.state.data)
  // },[location.state])

  useEffect(()=>{ 
    getData()
    console.log(datas);
  },[])
    // const cng = async ()=>{
    //     await authentication.changeuser();
    // }
    // cng()

  
  // const current = authentication.currentUser
  // console.log('current',current)
  function getData (){
    fetch(`/admin/returned`)
      .then(response => response.json())
      .then(json=>setData(json))
  }

  // console.log(props.auth);

  // if ( props.auth === true ){
  // useEffect(()=>{
    // if ( authentication.currentUser === null ) {
    //   // console.log('current',current.uid)
    //   // if (true){
    //   //  return <Redirect to='/admin'  />
    //   navigate(`/admin`,{state:{status:1}})
    //   return( <></> )
    // }
  // },[current])
    // else{

    function handleSubmit(e){
      // e.preventDefault()
      // console.log('hello',e.target[0].value)
    e.preventDefault();
    // let components=[]
    console.log(e.target.button.value)
  //   // console.log(props.tid)
  //   for ( let i = 0; i < e.target.test.length; i += 1) {
  //     components.push(e.target[i].value)
  //     e.target[i].value=null
  //   }
    const tid = e.target.button.value
    
  let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          }
      };
  axios.post('/admin/returned',{id:tid},axiosConfig)
      .then(res=>{
          // alert('login success')
          console.log('data',res.data)
          if ( res.data === false ) {
              // setAuth(true)
              // window.location.reload()
              // navigate(`/admin/orders`)
              console.log('error');
          }
          else{
              // navigate(`/admin`,{status:0})
              // setStatus(0);
              setData(res.data)
              console.log('data in else',res.data)
          }

      })
      .catch(err=>{
          console.log('so many bloody errors')
      })
    // console.log(components)
    }
    return (
        <AdminLayout>
          <h1 className="title-order">Return List</h1>
          {/* <button onClick={test}>orders</button>
          <button onClick={() => setPage('returned')}>returns</button> */}
          <ReturnRows elements={datas} submit={handleSubmit}></ReturnRows>
        </AdminLayout>
    )
  // }
  // }
  // else {
  //   return(
  //   navigate(`/admin`,{status:1})
  //   )
  // }
}
export default Returned