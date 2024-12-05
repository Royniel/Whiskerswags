import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdoptedPets.css';

const AdoptedPets = () => {
    const [adoptedPets, setAdoptedPets] = useState([]);

    useEffect(() => {
        const fetchAdoptedPets = async () => {
            try {
                const response = await axios.get('/api/stats/adopted');
                setAdoptedPets(response.data);
            } catch (error) {
                console.error('Error fetching adopted pets', error);
            }
        };
        fetchAdoptedPets();
    }, []);

    return (
        <div className="adopted-pets-container">
            <h2>Adopted Pets</h2>
            <div className="adopted-pets-grid">
                {adoptedPets.map(pet => (
                    <div key={pet._id} className="adopted-pet-card">
                        <img src={pet.imageURL || 'placeholder.jpg'} alt={pet.name} className="pet-image" />
                        <div className="card-content">
                            <h3>{pet.name}</h3>
                            <p><strong>Animal Type:</strong> {pet.animalType}</p>
                            <p><strong>Age:</strong> {pet.age}</p>
                            <p><strong>Breed:</strong> {pet.breed}</p>
                            <p><strong>Sex:</strong> {pet.sex}</p>
                            <p><strong>Colour:</strong> {pet.colour}</p>
                            <p><strong>Adopted by:</strong> {pet.userListed ? pet.userListed.name : 'Unknown'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptedPets;
