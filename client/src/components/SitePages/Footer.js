import React from 'react'
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap'
const Footer = () => {
  return (
    <Container fluid className='background' fixed="bottom">
      <ListGroup >
        <ListGroupItem className='primary'>
          Website created by Jesse Edwards and George Shaw
        </ListGroupItem>
      </ListGroup>
    </Container>
  )
}

export default Footer
