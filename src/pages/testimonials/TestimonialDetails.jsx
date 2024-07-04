import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestimonialDetails = () => {
    const { slug } = useParams();
    const [testimonial, setTestimonial] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        // Fetch the testimonial by slug from the API
        const fetchTestimonial = async () => {
            try {
                const response = await fetch(`/api/testimonial/${slug}/`);
                if (response.ok) {
                    const data = await response.json();
                    setTestimonial(data);
                } else {
                    console.error('Failed to fetch testimonial');
                }
            } catch (error) {
                console.error('Error fetching testimonial', error);
            }
        };

        fetchTestimonial();
    }, [slug]);

    return (
        <Container>
            <Row className="my-5 justify-content-center">
                {testimonial && (
                    <>
                        <Col md={8} className="d-flex flex-column align-items-center">
                            <Image src={testimonial.profile_image} roundedCircle className="mb-3" />
                            <h2>{testimonial.testimonial_giver_name}</h2>
                            <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial_text }} />
                            <h6 className="mt-3 d-flex align-items-center">
                                <Image src={testimonial.company_image} roundedCircle className="mr-2" />
                                {testimonial.testimonial_giver_position}
                            </h6>
                        </Col>
                        <Link to="/testimonials" className="mt-3">
                            <Button>Back to All Testimonials</Button>
                        </Link>
                        <Link to="/contact" className='m-2'>
                            <Button className='btn-secondary'>Contact for References</Button>
                        </Link>
                    </>
                )}
            </Row>
        </Container>
    );
};

export default TestimonialDetails;
