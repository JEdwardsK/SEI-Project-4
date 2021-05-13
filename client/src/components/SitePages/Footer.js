import React from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const Footer = () => {
  return (
    <Container fluid className='background' fixed="bottom">
      <ListGroup>
        <ListGroup.Item className='primary'>
          Website created by Jesse Edwards and George Shaw
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default Footer
