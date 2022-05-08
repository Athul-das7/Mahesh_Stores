import React from 'react'
import { useState } from 'react';
import AdminLayout from '../../components/adminLayout'

function Test() {
  const [data, setData] = useState();
  function getData (){
    fetch(`/admin/history`)
      .then(response => response.json())
      .then(json=>setData(json))
  }
  return (
    <AdminLayout>
        hello world
    </AdminLayout>
  )
}

export default Test