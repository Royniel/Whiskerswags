import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Welcome.css";

const Welcome = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalAdoptions: 0,
    waitingApprovals: 0,
    animalTypes: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="welcome-container">
      <h1>Welcome to the Admin Panel</h1>
      <div className="stats-grid">
        <div className="stat-block">
          <p>Active Listings</p>
          <h2>{stats.totalListings}</h2>
        </div>
        <div className="stat-block">
          <p>Total Adoptions</p>
          <h2>{stats.totalAdoptions}</h2>
        </div>
        <div className="stat-block">
          <p>Waiting Approvals</p>
          <h2>{stats.waitingApprovals}</h2>
        </div>
      </div>
      <h2>Active Listings by Animal Type</h2>
      <table className="animal-types-table">
        <thead>
          <tr>
            <th>Animal Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {stats.animalTypes.map((type) => (
            <tr key={type._id}>
              <td>{type._id.charAt(0).toUpperCase() + type._id.slice(1)}</td>
              <td>{type.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Welcome;