import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import { LoginContext } from '../../App'
import { useContext, useState } from 'react'


function Header(){

    const contextValue = useContext(LoginContext)
    const signedIn = contextValue.signedIn
    

    return(
        
        <Navbar expand="lg" className='py-3'>
            <Container>
                <Navbar.Brand href="/">Tick-It</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto justify-content-between" style={{width:`100%`}}>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href='/services'>Services</Nav.Link>
                    <Nav.Link href='/about'>About Us</Nav.Link>
                    <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className='login-button' href='/login'>
                            {signedIn ? ('Account') : ('Log In')}
                        </Button>
                    </div>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}

export default Header