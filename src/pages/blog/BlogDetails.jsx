import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const BlogDetails = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch('https://starfish-app-yfq49.ondigitalocean.app/sites/blog/1/');
                const data = await response.json();
                const selectedBlog = data.blogs.find(b => b.id === parseInt(blogId));
                setBlog(selectedBlog);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlog();
    }, [blogId]);

    return (
        <Container className="my-5">
            {blog && (
                <Card className="shadow-sm">
                    <Card.Img
                        variant="top"
                        src={blog.image}
                        style={{ width: '50%', height: '50%' }}
                    />
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Subtitle className="text-muted mb-4">{blog.date}</Card.Subtitle>
                        <div dangerouslySetInnerHTML={{ __html: blog.text }} className="blog-content" />
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default BlogDetails;
