// BlogDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Blog.css';

const BlogDetails = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'sites/blog/1/');
                const data = await response.json();
                const selectedBlog = data.blogs.find(b => b.id === parseInt(blogId));
                setBlog(selectedBlog);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlog();
    }, [blogId]);
    debugger;

    return (
        <Container className="my-5 blog-details-container">
            {blog && (
                <div className="blog-content-wrapper">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="blog-image"
                    />
                    <div className="blog-text">
                        <h1>{blog.title}</h1>
                        <h6 className="text-muted mb-4">{blog.date}</h6>
                        <div dangerouslySetInnerHTML={{ __html: blog.text }} className="blog-content" />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default BlogDetails;
