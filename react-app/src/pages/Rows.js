import React from 'react'
import { Table, Container } from '@mantine/core';

function Rows(props) {
    const elements = props.elements
    console.log(elements);
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.user.rollNo}</td>
      <td>{element.user.name}</td>
      <td>{element.user.phone}</td>
      <td>{element.cartComponents}</td>
    </tr>
  ));

  return (
    <Container size='xl' className='pad'>
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