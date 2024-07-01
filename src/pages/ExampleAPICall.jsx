import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://starfish-app-yfq49.ondigitalocean.app/sites/faq/1')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {data ? (
                <div>
                    <p>Message: {data['questions'][0].question}</p>
                    <p>Status: {data['questions'][0].answer}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ExampleComponent;
