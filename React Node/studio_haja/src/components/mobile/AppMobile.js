import React, { Component } from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Fade from 'react-reveal/Fade'
import logoMobile from '../../assets/logo_haja_mobile.png'


class AppMobile extends Component {
  render () {
    return (
      <div className='mobile'>

        <Fade>

          <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#features'>Features</Nav.Link>
                <Nav.Link href='#pricing'>Pricing</Nav.Link>
                <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                  <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href='#deets'>More deets</Nav.Link>
                <Nav.Link eventKey={2} href='#memes'>
                Dank memes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div className='mobile_1'>
            salut
            {/* <img src={logoMobile} class='logo1' alt='' /> */}
          </div>
        </Fade>
      </div>
    )
  }
}

export default AppMobile
