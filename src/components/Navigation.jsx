import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.navigation))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div>Loading...</div>;
    }

    return (
        config.include && (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">{config.siteName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {config.items.map((item, index) =>
                                item.include && (
                                    <LinkContainer key={index} to={item.link}>
                                        <Nav.Link>{item.name}</Nav.Link>
                                    </LinkContainer>
                                )
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    );
};

export default Navigation;
