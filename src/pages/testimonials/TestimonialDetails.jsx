import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestimonialDetails = () => {
    const { slug } = useParams();
    const [testimonial, setTestimonial] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'sites/testimonials/1/');
                if (response.ok) {
                    const data = await response.json();
                    const foundTestimonial = data.testimonials.find(t => t.slug === slug);
                    setTestimonial(foundTestimonial);
                } else {
                    console.error('Failed to fetch testimonials');
                }
            } catch (error) {
                console.error('Error fetching testimonials', error);
            }
        };

        fetchTestimonials();
    }, [slug]);

    return (
        <Container>
            {testimonial &&
                <Row className="my-5">
                    <Col md={8} className="d-flex flex-column align-items-center text-center">
                        <Image src={testimonial.profile_image} roundedCircle className="mb-3" style={{ width: '150px', height: '150px' }} />
                        <h2 className="mb-2">{testimonial.testimonial_giver_name}</h2>
                        <Row className="align-items-center mb-3">
                            {testimonial.company_image && (
                                <Col xs="auto">
                                    <Image src={testimonial.company_image} roundedCircle style={{ width: '50px', height: '50px' }} />
                                </Col>
                            )}
                            <Col>
                                <h5 className="font-weight-bold mb-0">{testimonial.testimonial_giver_position}</h5>
                            </Col>
                        </Row>
                        <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial_text }} className="text-left w-100" />
                        <Row>
                            <Col>
                                <Link to="/testimonials" className="mt-3">
                                    <Button>Back to All Testimonials</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/contact" className="m-2">
                                    <Button className="btn-secondary">Contact for References</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default TestimonialDetails;
