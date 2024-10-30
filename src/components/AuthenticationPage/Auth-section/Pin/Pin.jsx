import React, { useState } from 'react';
import SetPin from './SetPin.jsx';
import PinSuccess from './PinSuccess.jsx';

const Pin = () => {
    const [success, setSuccess] = useState('one');

    const handleSuccess = () => {
        console.log("Success function called"); // Debugging log
        setSuccess('two');
    };

    return (
        <div>
            {success === 'one' && <SetPin handleSuccess={handleSuccess} />}
            {success === 'two' && <PinSuccess />}
        </div>
    );
};

export default Pin;
