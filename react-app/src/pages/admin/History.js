import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AdminLayout from '../../components/adminLayout'
import RowsHistory from './RowsHistory'
import {useAuth} from '../../contexts/AuthContext'
import { FaLevelDownAlt } from 'react-icons/fa'
import axios from 'axios'

function History() {
    const location = useLocation() 

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