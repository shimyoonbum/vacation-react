import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import imgfile from '../resources/img/metanet.png';
import '../resources/css/Header.scss';

function Header(props) {
    const handleLogout = () => {
        window.alert('로그아웃 되었습니다.');
        window.sessionStorage.setItem('Authorization', '');
    };

    return (
        <>
            <Navbar
                fixed="top"
                expand="lg"
                style={{
                    zIndex: '99',
                    boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
                    backgroundColor : '#F1F2F6'
                }}
            >
                <Navbar.Brand
                    href="/main"
                    style={{ fontSize: '20px', margin: '0px 10px' }}
                >
                    <img src={imgfile} alt="Metanet"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    {
                        props.auth.find(p => p.authorityName === 'ROLE_USER')
                        ?   <Nav.Link href="/apply" className="link">
                                휴가 등록
                            </Nav.Link>                            
                        :   <></>
                    }
                    {
                        props.auth.find(p => p.authorityName === 'ROLE_ADMIN')
                        ?   <Nav.Link href="/manage" className="link">
                                신청자 목록
                            </Nav.Link>                                
                        :   <></>
                    }       
                    </Nav>            
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="/" className="link" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
export default Header;
