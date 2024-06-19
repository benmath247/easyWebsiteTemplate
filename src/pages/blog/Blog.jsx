import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css'; // Import the custom CSS file
import { Link } from 'react-router-dom';

const Blog = ({ blogs, preview }) => {
    const displayBlogs = preview ? blogs.slice(0, 3) : blogs;

    return (
        <div className="container blog-container">
            <div className="row">
                {displayBlogs.map((blog, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Link to={`/blog/${index}`} className="text-decoration-none">
                            <div className="card blog-card">
                                <img src={blog.image} className="card-img-top" alt={blog.title} />
                                <div className="card-body blog-card-body">
                                    <h5 className="card-title blog-card-title">
                                        <a href={blog['file-source']} target="_blank" rel="noopener noreferrer">
                                            {blog.title}
                                        </a>
                                    </h5>
                                    <p className="card-text blog-card-text">{blog.preview}</p>
                                </div>
                                <div className="card-footer blog-card-footer">
                                    <small className="text-muted">{blog.date}</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
