import React from 'react'
import { Table, Container } from '@mantine/core';
import { Button, Collapse } from '@mantine/core';
import { MdOutlineExpandMore } from "react-icons/md";
import { useState, useRef } from 'react';

function Collapse_comp(props) {
  const [opened, setOpen] = useState(false);
  const compField = useRef()
  function handleClick(){
    console.log(compField.current.value)
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
                    {props.cart.map(item=>{
          const getRef = (element) => (compField.current.push(element))
                      return (
                        <>
               {/* <p key={getRef}>{item}</p> */}
                        <input key={getRef} ref={compField} type="text" name="name" placeholder={item} />
                        <br/>
                        </>
                      )
                    })}
                    <Button onClick={handleClick}>Success</Button>
        </Collapse>
        {/* <Button >
          {MdOutlineExpandMore}
        </Button> */}
    </>
  )
}

export default Collapse_comp