import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Navigation.css'

const Navigation = () => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.navigation))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div></div>;
    }

    return (
        config.include && (
            <div className='custom-nav'>
                <Navbar expand="lg" >
                    <Container>
                        <Navbar.Brand href="/">
                            <span className='site-name'>
                                {config.siteName}
                            </span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {config.items.map((item, index) =>
                                    item.include && (
                                        <LinkContainer key={index} to={item.link}>
                                            <Nav.Link><span className='nav-link'>
                                                {item.name}
                                            </span></Nav.Link>
                                        </LinkContainer>
                                    )
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar></div >
        )
    );
};

export default Navigation;
