import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css'; // Import the custom CSS file
import { Link } from 'react-router-dom';

const Blog = ({ preview }) => {
    const [blogs, setBlogs] = useState([]);
    const [include, setInclude] = useState(false);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'sites/blog/1/')
            .then(response => response.json()
            )
            .then(data => {
                setBlogs(data.blogs);
                setInclude(data.include);
                setButtonText(data.button);
            })
            .catch(error => console.error('Error fetching blog data:', error));
    }, []);

    const displayBlogs = preview ? blogs.slice(0, 3) : blogs;

    return (
        <div className="container blog-container">
            <div className="row">
                {displayBlogs.map((blog, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Link to={`/blog/${blog.id}`} className="text-decoration-none">
                            <div className="card blog-card">
                                <img src={blog.image} className="card-img-top" style={{ height: "100%" }} alt={blog.title} />
                                <div className="card-body blog-card-body">
                                    <h5 className="card-title blog-card-title">
                                        <a href={blog['file-source']} target="_blank" rel="noopener noreferrer">
                                            {blog.title}
                                        </a>
                                    </h5>
                                    {/* <p className="card-text blog-card-text">{blog.text}</p> */}
                                </div>
                                <div className="card-footer blog-card-footer">
                                    <small className="text-muted">{blog.date}</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {include && (
                <div className="text-center">
                    <Link to="/all-blogs" className="btn btn-primary">{buttonText}</Link>
                </div>
            )}
        </div>
    );
};

export default Blog;
