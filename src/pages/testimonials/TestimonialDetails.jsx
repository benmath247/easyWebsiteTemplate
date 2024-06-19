import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col } from 'react-bootstrap';

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
            <Row className="justify-content-center my-5">
                <Col md={6} className="d-flex flex-column align-items-center">
                    {testimonial && (
                        <>
                            <Image src={testimonial.image} roundedCircle className="mb-3" />
                            <h1>{testimonial.name}</h1>
                            <p className="text-center">{testimonial.text}</p>
                            <h6>
                                <Image src={testimonial.companyLogo} roundedCircle className="mr-2" />
                                {testimonial.position}
                            </h6>
                            <p>Email: {testimonial.email}</p>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TestimonialDetails;
