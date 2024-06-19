import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../App.css';
import Blog from './blog/Blog';

export default function Home({ blogs }) {
    return (
        <div>
            <section className="jumbotron text-center bg-dark text-white py-5">
                <Container>
                    <h1>Jennifer Jaroslavsky</h1>
                    <p>Project Manager | Life Sciences</p>
                    <div className="d-flex justify-content-center">
                        <a href="#about" className="mx-2">
                            <button className="btn btn-primary">Download Resume</button>
                        </a>
                        <a href="contact" className="mx-2">
                            <button className="btn btn-secondary">Contact Jennifer</button>
                        </a>
                    </div>
                </Container>
            </section>
            <Blog blogs={blogs} />
            <footer className="text-center py-4 bg-light">
                <Container>
                    <p>&copy; 2024 Jennifer Jaroslavsky. All Rights Reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
