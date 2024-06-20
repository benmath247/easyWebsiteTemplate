import React, { useEffect, useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import './FAQ.css';

export default function FAQ() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.pages.faq))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div>Loading...</div>;
    }

    return (
        config.include && (
            <Container>
                <h1>{config.header}</h1>
                <Accordion defaultActiveKey="0">
                    {config.questions.map((item, index) => (
                        <Card key={index}>
                            <Accordion.Item eventKey={String(index)}>
                                <Accordion.Header>{item.question}</Accordion.Header>
                                <Accordion.Body>{item.answer}</Accordion.Body>
                            </Accordion.Item>
                        </Card>
                    ))}
                </Accordion>
            </Container>
        )
    );
};
