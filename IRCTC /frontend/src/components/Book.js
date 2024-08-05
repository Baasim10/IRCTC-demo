import React, { useState } from 'react';
import axios from 'axios';

const Book = ({ match }) => {
    const [seats, setSeats] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/book', { trainId: match.params.id, seats }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Booking successful');
        } catch (error) {
            alert('Booking failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Number of Seats</label>
                <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} required />
            </div>
            <button type="submit">Book</button>
        </form>
    );
};

export default Book;
