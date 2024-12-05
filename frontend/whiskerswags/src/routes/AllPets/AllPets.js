import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllPets.css";
import NavBar from "../../components/Navbar/Navbar";
import PetCard from "../../components/PetCard/PetCard";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/petlisting");
        setPets(response.data
            .filter((pet) => pet.approved)
            .filter((pet) => pet.adoptedStatus === false));
        setFilteredPets(response.data
            .filter((pet) => pet.approved)
            .filter((pet) => pet.adoptedStatus === false));
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };

    const fetchUserId = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        setUserId(user._id);
      }
    };

    fetchPets();
    fetchUserId();
  }, []);

  const handleFilter = (animalType) => {
    if (animalType === "All") {
      setFilteredPets(pets); 
    } else {
      const filtered = pets.filter(
        (pet) => pet.animalType.toLowerCase() === animalType.toLowerCase()
      );
      setFilteredPets(filtered);
    }
  };

  return (
    <div>
      <NavBar /> {}
      <div className="all-pets">
        <h2>Pawfect Matches</h2>
        <div className="filter-buttons">
          {}
          <button onClick={() => handleFilter("All")}>All</button>
          <button onClick={() => handleFilter("Dog")}>Dogs</button>
          <button onClick={() => handleFilter("Cat")}>Cats</button>
          <button onClick={() => handleFilter("Rabbit")}>Rabbits</button>
          <button onClick={() => handleFilter("Bird")}>Birds</button>
          <button onClick={() => handleFilter("Reptile")}>Reptiles</button>
          <button onClick={() => handleFilter("Other")}>Other</button>
        </div>
        <div className="pet-cards">
          {}
          {filteredPets.map((pet) => (
            <PetCard
              key={pet._id}
              pet={pet}
              userId={userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPets;
