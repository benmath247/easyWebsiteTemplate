import React, { useEffect, useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import './FAQ.css';

export default function FAQ() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + 'sites/faq/1/')
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    if (!config) {
        return <div></div>;
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
                                <Accordion.Body dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </Accordion.Item>
                        </Card>
                    ))}
                </Accordion>
            </Container>
        )
    );
};
