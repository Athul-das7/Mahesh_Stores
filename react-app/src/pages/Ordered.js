import React from 'react'
import {useState, useEffect} from 'react'

function Ordered() {
  const [page, setPage] = useState('ordered')
  // console.log(page);
  const [datas,setData] = useState([])

  useEffect(()=>{ 
    fetch(`http://localhost:5000/admin/${page}`)
      .then(response => response.json())
      .then(json=>setData(json))
    console.log(page);

  },[page])
  return (
    <>
      <button onClick={() => setPage('ordered')}>orders</button>
      <button onClick={() => setPage('returned')}>returns</button>
      <h1>{page}</h1>
      {datas.map(data =>{
        return <pre> {JSON.stringify(data)} </pre>;
      })}
    </>
  )
}

export default Ordered