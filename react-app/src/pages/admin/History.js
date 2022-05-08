import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AdminLayout from '../../components/adminLayout'
import Rows from './Rows'
import {useAuth} from '../../contexts/AuthContext'
import { FaLevelDownAlt } from 'react-icons/fa'
import axios from 'axios'

function History() {

    const [datas,setData] =useState([])


    useEffect(() => {
        getData()
        console.log('data from json',datas);
    },[])
    function getData(){
        fetch(`/admin/History`)
        .then(response => response.json())
        .then(json => setData(json))
    }
    return(
        <AdminLayout>
            <h1 className="title-history">History List</h1>

        </AdminLayout>

    )
}

export default History