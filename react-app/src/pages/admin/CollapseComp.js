import React from 'react'
import { Table, Container } from '@mantine/core';
import { Button, Collapse } from '@mantine/core';
import { MdOutlineExpandMore } from "react-icons/md";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'

function CollapseComp(props) {
  const [opened, setOpen] = useState(false);
  const itemsRef= useRef([])
  const compField= useRef([])
  const navigate = useNavigate()
  
   useEffect(() => {
       itemsRef.current = itemsRef.current.slice(0, props.cart.length);
    }, [props.cart]);
  // compField.current = []
  function handleSubmit(e){
    e.preventDefault();
    let components=[]
    console.log(e.target.button.value)
    // console.log(props.tid)
    for ( let i = 0; i < props.cart.length; i += 1) {
      components.push(e.target[i].value)
      e.target[i].value=null
    }
    const tid = e.target.button.value
    
  let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          }
      };
  axios.post('http://localhost:5000/admin/ordered',{id:tid,components:components},axiosConfig)
      .then(res=>{
          // alert('login success')
          console.log('data',res.data)
          if ( res.data === true ) {
              // setAuth(true)
              navigate(`/admin/orders`)
          }
          else{
              // navigate(`/admin`,{status:0})
              // setStatus(0);
              console.log('error');
          }

      })
      .catch(err=>{
          console.log('so many bloody errors')
      })
    console.log(components)
  }
  // const comp= compField.current.value
  // console.log(comp);
  // function test () {
  // // const comp= compField.current.value
  // // console.log(comp);

  // }

  return (
    <>
        <Button onClick={() => setOpen((o) => !o)}>
          {/* Toggle content */}
          {MdOutlineExpandMore()}
        </Button>

        <Collapse  in={opened}>

                    <form onSubmit={handleSubmit}>
                      {props.cart.map(item=>{
                                // const getRef = (element) => (compField.current.push(element))
                        return (
                          <>
                                     {/* <p key={getRef}>{item}</p> */}
                          <input type="text" name="test" placeholder={item} />
                          <br/>
                          </>
                        )
                      })}
                      <Button type="submit" name="button" value={props.tid} >Success</Button>
                    </form>
        </Collapse>
        {/* <Button >
          {MdOutlineExpandMore}
        </Button> */}
    </>
  )
}

export default CollapseComp