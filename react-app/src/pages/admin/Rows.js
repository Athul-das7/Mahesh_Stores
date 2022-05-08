import React from 'react'
import { Table, Container } from '@mantine/core';
import { Button, Collapse } from '@mantine/core';
import { useState } from 'react';
// import { Button } from 'react-bootstrap'
import CollapseComp from './CollapseComp';

function Rows(props) {
  const elements = props.elements
  const [cartdata,setCartdata] = useState([]);
  console.log(elements);
  function handleClick(){
    // e.preventDefault()
    console.log('didn\'t run')
  }
  function colData(){
    console.log('hi')
  }
  var pos = 0;
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.user.rollNo}</td>
      <td>{element.user.name}</td>
      <td>{element.user.phone}</td>
      <td>
      <CollapseComp submit={props.submit} cart={element.cartComponents} tid={element.id}/>
      </td>
    </tr>
  ));

  return (
    <Container size='xl' className='pad-table'>
    <Table>
      <thead>
        <tr>
          <th>Roll NO.</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Component Details</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </Container>
  );
}

export default Rows