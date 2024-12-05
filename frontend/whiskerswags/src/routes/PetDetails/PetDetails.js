import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PetDetails.css";
import Navbar from "../../components/Navbar/Navbar";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`/api/petlisting/${id}`);
        setPet(response.data);
        setLikeCount(response.data.likedUsers.length);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching pet details", error);
      }
    };
    fetchPetDetails();
  }, [id]);

  const handleAdopt = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser._id) {
      try {
        await axios.put(`/api/petlisting/adopt/${id}`, {
          userId: loggedInUser._id,
        });
        alert("Pet adopted successfully");
      } catch (error) {
        console.error("Error adopting pet", error);
        alert("Failed to adopt pet");
      }
    }
  };

  return (
    <div className="petDetailsHousing">
      <Navbar />
      <div className="pet-details-container">
        {pet ? (
          <>
            <img
              src={pet.imageURL || "placeholder.jpg"}
              alt={`${pet.name}`}
              className="pet-image"
            />
            <h2>{pet.name}</h2>
            <p>Type: {pet.animalType}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Sex: {pet.sex}</p>
            <p>Colour: {pet.colour}</p>
            <p>Likes: {likeCount}</p>
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments" : "Show All Comments"}
            </button>
            {showComments && (
              <div className="comments-section">
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>
                      <strong>{comment.name}</strong>: {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleAdopt}>Adopt</button>
            <Link to="/home">Back to Home</Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
