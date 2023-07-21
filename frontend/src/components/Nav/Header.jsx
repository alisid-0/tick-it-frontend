import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LoginContext } from '../../App';
import { useContext } from 'react';
import Transitions from '../Transition';

function Header() {
  const contextValue = useContext(LoginContext);
  const signedIn = contextValue.signedIn;

  return (
  <Transitions>
    <Navbar expand="lg" className='py-3' style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
      <Container>
        
        <Navbar.Brand href="/" style={{ fontSize: '24px', color:'white' , fontWeight: 'bold' }}>Tick-It</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link href='/venues' style={{ fontSize: '18px', fontWeight: 500, color: '#ffffff', marginRight: '20px' }}>Venues</Nav.Link>
          <Nav className="me-auto justify-content-between" style={{ width: '100%' }}>
            <Nav.Link href='/events' style={{ fontSize: '18px', fontWeight: 500, color: '#ffffff', marginRight: '20px' }}>Events</Nav.Link>
           
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button className='login-button' href='/login' style={{ fontSize: '16px', fontWeight: 'bold', backgroundColor: '#ffffff', color: '#2c3e50', border: 'none', borderRadius: '4px', padding: '8px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                {signedIn ? ('Account') : ('Log In')}
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
      
    </Navbar>
    </Transitions>
  );
}

export default Header;
