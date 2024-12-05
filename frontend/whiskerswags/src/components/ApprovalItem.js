import React from 'react';
import './ApprovalItem.css';

const ApprovalItem = ({ listing, onApprove, onDelete }) => {
    return (
        <div className="approval-card">
            <img src={listing.imageURL || 'placeholder.jpg'} alt={listing.name} className="pet-image" />
            <div className="card-content">
                <h3>{listing.name}</h3>
                <p><strong>Animal Type:</strong> {listing.animalType}</p>
                <p><strong>Age:</strong> {listing.age}</p>
                <p><strong>Breed:</strong> {listing.breed}</p>
                <p><strong>Sex:</strong> {listing.sex}</p>
                <p><strong>Colour:</strong> {listing.colour}</p>
            </div>
            <div className="card-actions">
                <button className="approve-button" onClick={() => onApprove(listing._id)}>Approve</button>
                <button className="delete-button" onClick={() => onDelete(listing._id)}>Delete</button>
            </div>
        </div>
    );
};

export default ApprovalItem;
