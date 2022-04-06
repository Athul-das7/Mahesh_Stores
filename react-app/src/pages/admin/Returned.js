import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Returned(props) {
  const navigate = useNavigate()
  const [page, setPage] = useState('returned')
  // console.log(page);
  const [datas,setData] = useState([])

  useEffect(()=>{ 
    fetch(`http://localhost:5000/admin/ordered`)
      .then(response => response.json())
      .then(json=>setData(json))
  }, [page] )

  // async function getData (req){
  //   fetch(`http://localhost:5000/admin/${req}`)
  //     .then(response => response.json())
  //     .then(json=>setData(json))
  //   console.log(datas);
  // }

  console.log(props.auth);
  console.log(datas);

    return (
        <>
          {/* console.log({datas}) */}
          {datas.map(data =>{
            return <pre>{JSON.stringify(data)}</pre>
          })}
        </>
    )
}

export default Returned