import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const Testimonials = ({ testimonials }) => {

    console.log(testimonials)
    return (
        <Container>
            <h1 className="my-4">Testimonials</h1>
            <Row>
                {testimonials.length > 0 ? (
                    testimonials.map((testimonial, index) => (
                        <Col key={testimonial.email} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
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
    );
};

export default Testimonials;
