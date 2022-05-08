
import React from 'react'
import { Table, Container } from '@mantine/core';
import { Button, Collapse, Badge } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

import { useState } from 'react';
// import { Button } from 'react-bootstrap'
import HistoryCollapse from './HistoryCollapse';

function RowsHistory(props) {
  const elements = props.elements
  const [cartdata,setCartdata] = useState([]);
  console.log(elements);

  function status(s){
        var st=0;
        if(s === 0){
            st= <td><Badge color='blue' variant="filled">
      ordered 
    </Badge></td>
        }
        else if(s === 1){
            st= <td ><Badge color='yellow' variant="filled">yet to return</Badge></td>
        }
        else{
            
            st= <td ><Badge color='green' variant="filled">returned</Badge></td>
        }
        return st;
  }
  
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.user.rollNo}</td>
      <td>{element.user.name}</td>
      <td>{element.user.phone}</td>
      <td>
        {/* <Button onClick={() => setOpen((o) => !o)}>
          Toggle content
        </Button>

        <Collapse key={element.id} in={opened}>
          depressing
        </Collapse> */}
        {console.log('elementid',element.id)}
        
      <HistoryCollapse submit={props.submit} cart={element.cartComponents} tid={element.id}/>
      </td>
      {/* {(element.status === 1 ?<td>
          dd
      </td>:<td>22</td>)} */}
      {status(element.status)}
      {/* <td>
        <form onSubmit={props.submit}>
         <Button type="submit" name="button" value={element.id} >Success</Button>
        </form>
      </td> */}
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
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </Container>
  );
}

export default RowsHistory