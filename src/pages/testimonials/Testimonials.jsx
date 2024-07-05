import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const Testimonials = () => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'sites/testimonials/1/')
            .then(response => response.json())
            .then(data => {
                setConfig(data);
            })
            .catch(error => console.error('Error fetching blog data:', error));
    }, []);

    if (!config) {
        return <div></div>;
    }

    const testimonials = config.testimonials;
    console.log(testimonials)

    return (
        config.include && (
            <Container>
                <h1 className="my-4">{config.header}</h1>
                <p>{config.subheader}</p>
                <Row>
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <Col key={testimonial.email} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center mb-4">
                                <Link to={`/testimonials/${testimonial.slug}`} className="text-decoration-none" style={{ "width": "100%", "height": "250px" }}>
                                    <div className="d-flex flex-column align-items-center testimonial-item" >
                                        <Image src={testimonial.profile_image} roundedCircle className="mb-3" />
                                        <p className="text-center">{testimonial.text}</p>
                                        <h5>{testimonial.testimonial_giver_name}</h5>
                                        <h6 className="d-flex align-items-center">
                                            {testimonial.company_image && <Image src={testimonial.company_image} roundedCircle className="me-2" />}
                                            {testimonial.testimonial_giver_position}
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
