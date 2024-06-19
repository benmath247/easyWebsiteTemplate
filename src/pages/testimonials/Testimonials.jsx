import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const Testimonials = ({ testimonials }) => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.pages.testimonials))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div>Loading...</div>;
    }

    return (
        config.include && (
            <Container>
                <h1 className="my-4">{config.header}</h1>
                <p>{config.subheader}</p>
                <Row>
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <Col key={testimonial.email} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center mb-4">
                                <Link to={`/testimonials/${index}`} className="text-decoration-none">
                                    <div className="d-flex flex-column align-items-center testimonial-item">
                                        <Image src={testimonial.image} roundedCircle className="mb-3" />
                                        <p className="text-center">"{testimonial.text}"</p>
                                        <h5>{testimonial.name}</h5>
                                        <h6 className="d-flex align-items-center">
                                            {testimonial.companyLogo && <Image src={testimonial.companyLogo} roundedCircle className="me-2" />}
                                            {testimonial.position}
                                        </h6>
                                    </div>
                                </Link>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No testimonials found.</p>
                        </Col>
                    )}
                </Row>
            </Container>
        )
    );
};

export default Testimonials;
