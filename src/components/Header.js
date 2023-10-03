import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logoApp from '../assets/images/2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { useContext} from 'react'

const Header = (props) => {

    const {logout, user} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate('/')
        toast.success("Logout thanh cong!")
    }

   
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">
                
                <img 
                    src={logoApp}
                    width='50'
                    height='30'
                    className='d-inline-block align-top'
                    alt='React Bootstrap logo'
                />

                <span>App Test</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            { (user) && (user.auth || window.location.pathname === "/") &&
                <>
                    <Nav className="me-auto" >

                        <NavLink to="/" className="nav-link">Home</NavLink>

                        <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                    </Nav>
                    <Nav>
                        {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                        <NavDropdown title="Setting" >

                        {user && user.auth === true
                            ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                            : <NavLink to='/login' className = 'dropdown-item'>Login</NavLink>
                        }

                        </NavDropdown>
                    </Nav>
                </>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>

    </>)
}

export default Header;