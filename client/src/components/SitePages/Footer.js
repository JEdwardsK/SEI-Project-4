import React from 'react'
// import { Container, ListGroup, ListGroupItem } from 'react-bootstrap'
const Footer = () => {
  return (
  // <Container fluid className='background' fixed="bottom">
  //   <ListGroup >
  //     <ListGroupItem className='primary'>
  //       Website created by Jesse Edwards and George Shaw
  //     </ListGroupItem>
  //   </ListGroup>
  // </Container>

    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  )
}

export default Footer
