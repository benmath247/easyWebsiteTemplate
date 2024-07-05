import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import '../App.css';
import Blog from './blog/Blog';
import { Link } from 'react-router-dom';
import './Home.css'
import ExampleComponent from './ExampleAPICall';

export default function Home({ blogs }) {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.pages.home))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div></div>;
    }

    return (
        <div>
            {config.include && (
                <>
                    <section className="jumbotron text-center bg-dark text-white py-5 gradient-background">
                        <Container>
                            <h1>{config.h1}</h1>
                            <p>{config.tagline}</p>
                            <div className="d-flex justify-content-center">
                                {config.firstButton.include && (
                                    <a href={config.firstButton.link} className="mx-2">
                                        <button className="btn btn-primary">{config.firstButton.text}</button>
                                    </a>
                                )}
                                {config.secondButton.include && <a href={config.secondButton.link} className="mx-2">
                                    <button className="btn btn-secondary">{config.secondButton.text}</button>
                                </a>}
                            </div>
                        </Container>
                    </section>
                    {config.blogsection.include && (
                        <Blog preview={config.blogsection.preview} blogs={blogs} />
                    )}
                    {/* {config.blogsection.include && config.blogsection.includeButton && (
                        <section>
                            <Container>
                                <div className="d-flex justify-content-center py-3">
                                    <Link to={"blog"}>
                                        <Button className='btn-lg'>{config.blogsection.buttonText}</Button>
                                    </Link>
                                </div>
                            </Container>
                        </section>
                    )} */}
                </>
            )}
        </div>
    );
}
