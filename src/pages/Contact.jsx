import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../Contact.css';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => setConfig(data.pages.contact))
            .catch(error => console.error('Error loading config:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        };

        if (subscribe) {
            data.tags = ['JenniferJaroslavsky Updates'];
        }

        const API_KEY = process.env.REACT_APP_MAILCHIMP_API_KEY;
        const LIST_ID = process.env.REACT_APP_MAILCHIMP_LIST_ID;
        const DATACENTER = API_KEY.split('-')[1];

        const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Thank you for contacting us!');
                setEmail('');
                setFirstName('');
                setLastName('');
                setMessage('');
                setSubscribe(false);
            } else {
                throw new Error('Failed to submit contact form');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (!config) {
        return <div></div>;
    }

    return (
        config.include && (
            <Container>
                <h1>{config.header}</h1>
                <p>{config.subheader}</p>
                <Form onSubmit={handleSubmit}>
                    {config.fields.firstName.include && (
                        <Form.Group controlId="firstName">
                            <Form.Label className="form-label">{config.fields.firstName.label}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={config.fields.firstName.placeholder}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    {config.fields.lastName.include && (
                        <Form.Group controlId="lastName">
                            <Form.Label className="form-label">{config.fields.lastName.label}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={config.fields.lastName.placeholder}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    {config.fields.email.include && (
                        <Form.Group controlId="email">
                            <Form.Label className="form-label">{config.fields.email.label}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={config.fields.email.placeholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    {config.fields.message.include && (
                        <Form.Group controlId="message">
                            <Form.Label className="form-label">{config.fields.message.label}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={config.fields.message.placeholder}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    {config.fields.subscribe.include && (
                        <Form.Group controlId="subscribe">
                            <Form.Check
                                type="checkbox"
                                label={config.fields.subscribe.label}
                                checked={subscribe}
                                className='form-checkbox'
                                onChange={(e) => setSubscribe(e.target.checked)}
                            />
                        </Form.Group>
                    )}
                    <Button variant="primary" type="submit" className="button-margin">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    );
};

export default Contact;
