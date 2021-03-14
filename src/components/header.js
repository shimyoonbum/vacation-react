import React from 'react';
import {
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';
import imgfile from '../resources/img/metanet.png';

function Header() {
    const handleLogout = () => {
        window.alert('로그아웃 되었습니다.');
    };
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/main">
                    <img src={imgfile} alt="Metanet"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                1
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">
                                2
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="/" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
export default Header;
