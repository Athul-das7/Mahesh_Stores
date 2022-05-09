import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import RowsHistory from './RowsHistory'
import {useAuth} from '../../contexts/AuthContext'
import { FaLevelDownAlt } from 'react-icons/fa'
import axios from 'axios'

function History() {
    const location = useLocation() 
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

    const navigate = useNavigate()
    const [datas,setDatas] =useState([])


    useEffect(() => {
        getData()
    },[])
    function getData(){
        fetch(`/admin/History`)
        .then(response => response.json())
        .then(json => setDatas(json))
    }
    console.log('data from json',datas);
    return(
        <AdminLayout>
            <h1 className="title-history">History List</h1>
            <RowsHistory elements={datas} ></RowsHistory>
        </AdminLayout>
        

    )
}

export default History