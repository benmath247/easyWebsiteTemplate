import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col } from 'react-bootstrap';

const BlogDetails = ({ blogs }) => {
    const { blogId } = useParams();
    const [blog, setblog] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        // Find the blog by its ID
        const selectedblog = blogs[blogId];
        console.log(blogId);
        setblog(selectedblog);
    }, [blogId, blogs]);


    useEffect(() => {
        // Fetch HTML content only if blog exists
        if (blog) {
            const fetchHtmlContent = async () => {
                try {
                    const response = await fetch(blog["file-source"]);
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
    }, [blog]);

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={6} className="d-flex flex-column align-items-center">
                    {blog && (
                        <>
                            <Image src={blog.image} roundedCircle className="mb-3" />
                            <h1>{blog.title}</h1>
                            <h3>{blog.date}</h3>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default BlogDetails;
