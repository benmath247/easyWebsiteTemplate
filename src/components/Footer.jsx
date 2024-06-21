import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import '../App.css';

export default function Home({ blogs }) {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.footer))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div></div>;
    }

    return (
        <>
            {config.include && (
                <footer className="mt-5 text-center py-4 bg-light">
                    <Container>
                        <div className={`social-icons my-${config.iconSpacingY}`}>
                            {config.email && (
                                <a href={`mailto:${config.emailAddress}`} aria-label="GitHub">
                                    <FaEnvelope color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                            {config.github && (
                                <a href={config.githubLink} aria-label="GitHub">
                                    <FaGithub color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                            {config.linkedin && (
                                <a href={config.linkedinLink} aria-label="LinkedIn">
                                    <FaLinkedin color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                            {config.twitter && (
                                <a href={config.twitterLink} aria-label="Twitter">
                                    <FaTwitter color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                            {config.facebook && (
                                <a href={config.facebookLink} aria-label="Facebook">
                                    <FaFacebook color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                            {config.resume && (
                                <a href={config.resumeLink} aria-label="Resume">
                                    <FaFileAlt color={config.iconColor} size={config.iconSize} className={`mx-${config.iconSpacingX}`} />
                                </a>
                            )}
                        </div>
                        <p className='mt-3'>{config.text}</p>
                    </Container>
                </footer>
            )}
        </>
    );
}
