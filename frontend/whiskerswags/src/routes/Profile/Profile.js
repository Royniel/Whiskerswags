import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [listedPets, setListedPets] = useState([]);
    const [likedPets, setLikedPets] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (loggedInUser && loggedInUser._id) {
                try {
                    const userResponse = await axios.get(`/api/users/${loggedInUser._id}`);
                    setUser(userResponse.data);

                    const listedPetsResponse = await axios.get(`/api/users/pets/listed/${loggedInUser._id}`);
                    setListedPets(listedPetsResponse.data);

                    const likedPetsResponse = await axios.get(`/api/users/pets/liked/${loggedInUser._id}`);
                    setLikedPets(likedPetsResponse.data);

                    const adoptedPetsResponse = await axios.get(`/api/users/pets/adopted/${loggedInUser._id}`);
                    setAdoptedPets(adoptedPetsResponse.data);

                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <Navbar />
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Surname:</strong> {user.surname}</p>
            </div>
            <div className="profile-pets">
                <h3>Listed Pets</h3>
                <div className="pets-grid">
                    {listedPets.length > 0 ? (
                        listedPets.map(pet => (
                            <div key={pet._id} className="pet-card">
                                <p><strong>Name:</strong> {pet.name}</p>
                                <p><strong>Type:</strong> {pet.animalType}</p>
                                <p><strong>Breed:</strong> {pet.breed}</p>
                            </div>
                        ))
                    ) : (
                        <p>No listed pets.</p>
                    )}
                </div>
            </div>
            <div className="profile-pets">
                <h3>Liked Pets</h3>
                <div className="pets-grid">
                    {likedPets.length > 0 ? (
                        likedPets.map(pet => (
                            <div key={pet._id} className="pet-card">
                                <p><strong>Name:</strong> {pet.name}</p>
                                <p><strong>Type:</strong> {pet.animalType}</p>
                                <p><strong>Breed:</strong> {pet.breed}</p>
                            </div>
                        ))
                    ) : (
                        <p>No liked pets.</p>
                    )}
                </div>
            </div>
            <div className="profile-pets">
                <h3>Adopted Pets</h3>
                <div className="pets-grid">
                    {adoptedPets.length > 0 ? (
                        adoptedPets.map(pet => (
                            <div key={pet._id} className="pet-card">
                                <p><strong>Name:</strong> {pet.name}</p>
                                <p><strong>Type:</strong> {pet.animalType}</p>
                                <p><strong>Breed:</strong> {pet.breed}</p>
                            </div>
                        ))
                    ) : (
                        <p>No adopted pets.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
