import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestimonialDetails = ({ testimonials }) => {
    const { testimonialId } = useParams();
    const [testimonial, setTestimonial] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        // Find the testimonial by its ID
        const selectedTestimonial = testimonials[testimonialId];
        // console.log(selectedTestimonial);
        setTestimonial(selectedTestimonial);
    }, [testimonialId, testimonials]);


    useEffect(() => {
        // Fetch HTML content only if testimonial exists
        if (testimonial) {
            const fetchHtmlContent = async () => {
                try {
                    const response = await fetch(testimonial["file-source"]);
                    if (response.ok) {
                        const html = await response.text();
                        console.log(html);
                        setHtmlContent(html);
                        console.log(htmlContent)
                    } else {
                        console.error('Failed to fetch HTML content');
                    }
                } catch (error) {
                    console.error('Error fetching HTML content', error);
                }
            };

            fetchHtmlContent();
        }
    }, [testimonial]);

    return (
        <Container>
            <Row className="my-5 justify-content-center">
                {testimonial && (
                    <>
                        <Col md={8} className="d-flex flex-column align-items-center">
                            <Image src={testimonial.image} roundedCircle className="mb-3" />
                            <h2>{testimonial.name}</h2>
                            <p className="">{testimonial.text}</p>
                            <h6>
                                <Image src={testimonial.companyLogo} roundedCircle className="" />
                                {testimonial.position}
                            </h6>
                        </Col>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        <Link to="/testimonials">
                            <Button>Back to All Testimonials</Button>
                        </Link>
                        <Link to="/contact" className='m-2'>
                            <Button className='btn-secondary'>Contact for References</Button>
                        </Link>
                    </>
                )}
                {/* </Col> */}
            </Row>
        </Container>
    );
};

export default TestimonialDetails;
