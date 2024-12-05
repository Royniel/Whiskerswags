import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PetCard from "../../components/PetCard/PetCard";
import Navbar from "../../components/Navbar/Navbar";
import "./PetMatching.css";

const PetMatching = () => {
  const { type } = useParams();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/petlisting");
        const filteredPets = response.data
          .filter((pet) => pet.approved)
          .filter((pet) => pet.adoptedStatus === false);
        setPets(filteredPets);
        filterPets(filteredPets, type.toLowerCase());
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };
    fetchPets();
  }, [type]);

  const filterPets = (allPets, type) => {
    if (type === "all") {
      setFilteredPets(allPets);
    } else {
      const filtered = allPets.filter(
        (pet) => pet.animalType.toLowerCase() === type.toLowerCase()
      );
      setFilteredPets(filtered);
    }
  };

  const handleFilter = (filterType) => {
    filterPets(pets, filterType.toLowerCase());
  };

  return (
    <div className="pet-matching">
      <Navbar/>
      <h2>Matching Pets - {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <div className="filter-buttons">
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("dog")}>Dogs</button>
        <button onClick={() => handleFilter("cat")}>Cats</button>
        <button onClick={() => handleFilter("rabbit")}>Rabbits</button>
        <button onClick={() => handleFilter("bird")}>Birds</button>
        <button onClick={() => handleFilter("reptile")}>Reptiles</button>
        <button onClick={() => handleFilter("other")}>Other</button>
      </div>
      <div className="pet-cards">
        {filteredPets.map((pet) => (
          <PetCard key={pet._id} pet={pet} userId={user._id} />
        ))}
      </div>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default PetMatching;