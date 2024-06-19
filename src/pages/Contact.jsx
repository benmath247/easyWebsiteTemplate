import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../Contact.css';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [subscribe, setSubscribe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email_address: email,
            status: 'subscribed', // Change this as needed (e.g., 'pending' for double opt-in)
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

    return (
        <Container>
            <h1>Contact</h1>
            <p>Get in touch with us here.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label className="form-label">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label className="form-label">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label className="form-label">Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="subscribe">
                    <Form.Check
                        type="checkbox"
                        label="Subscribe to updates from Jennifer Jaroslavsky"
                        checked={subscribe}
                        className='form-checkbox'
                        onChange={(e) => setSubscribe(e.target.checked)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="button-margin">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Contact;
