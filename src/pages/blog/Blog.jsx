import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Blog = ({ blogs, preview }) => {

    if (preview) {
        blogs = blogs.slice(0, 3)
    }
    return (
        <div className="container mt-4">
            <div className="row">
                {blogs.map((blog, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Link to={`/blog/${index}`} className="text-decoration-none">
                            <div className="card h-100">
                                <img src={blog.image} className="card-img-top" alt={blog.title} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <a href={blog['file-source']} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                            {blog.title}
                                        </a>
                                    </h5>
                                    <p className="card-text">{blog.preview}</p>
                                </div>
                                <div className="card-footer">
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
