import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trains = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [trains, setTrains] = useState([]);

    const fetchTrains = async () => {
        try {
            const response = await axios.get('/api/trains', { params: { source, destination } });
            setTrains(response.data);
        } catch (error) {
            alert('Failed to fetch trains');
        }
    };

    useEffect(() => {
        if (source && destination) fetchTrains();
    }, [source, destination]);

    return (
        <div>
            <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <button onClick={fetchTrains}>Search Trains</button>
            <ul>
                {trains.map(train => (
                    <li key={train.id}>
                        {train.trainName} - {train.availableSeats} seats available
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Trains;
