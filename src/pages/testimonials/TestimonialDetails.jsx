import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestimonialDetails = () => {
    const { slug } = useParams();
    const [testimonial, setTestimonial] = useState(null);

    useEffect(() => {
        // Fetch the testimonials data from the API
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'sites/testimonials/1/');
                if (response.ok) {
                    const data = await response.json();
                    // Find the specific testimonial by slug
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
    debugger
    return (
        <Container> {testimonial &&
            <Row className="my-5 justify-content-center">
                <Col md={8} className="d-flex flex-column align-items-center">
                    <Image src={testimonial.profile_image} roundedCircle className="mb-3" />
                    {testimonial.company_image && (
                        <Image src={testimonial.company_image} roundedCircle className="mr-2" />
                    )}
                    {testimonial.testimonial_giver_position}
                    <h2>{testimonial.testimonial_giver_name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial_text }} />
                    <h6 className="mt-3 d-flex align-items-center">
                    </h6>
                </Col>
                <Link to="/testimonials" className="mt-3">
                    <Button>Back to All Testimonials</Button>
                </Link>
                <Link to="/contact" className="m-2">
                    <Button className="btn-secondary">Contact for References</Button>
                </Link>
            </Row>
        }
        </Container>
    );
};

export default TestimonialDetails;
