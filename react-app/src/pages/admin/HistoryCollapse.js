
import React from 'react'
import { Table, Container } from '@mantine/core';
import { Button, Collapse } from '@mantine/core';
import { MdOutlineExpandMore } from "react-icons/md";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'

function HistoryCollapse(props) {
  const [opened, setOpen] = useState(false);
  // const itemsRef= useRef([])
  // const compField= useRef([])
  const navigate = useNavigate()
  
  return (
    <>
        <Button onClick={() => setOpen((o) => !o)}>
          {/* Toggle content */}
          {MdOutlineExpandMore()}
        </Button>

        <Collapse  in={opened}>

                    <form>
                      {props.cart.map(item=>{
                        return (
                          <>

                            <label>{item}</label>
                          <br/>
                          </>
                        )
                      })}
                    </form>
        </Collapse>
        {/* <Button >
          {MdOutlineExpandMore}
        </Button> */}
    </>
  )
}

export default HistoryCollapse