import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import Approvals from "./Approvals";
import "./AdminHome.css";
import Users from "./Users";
import logo from '../assets/images/whiskers-logo.svg';
import AdoptedPets from "./AdoptedPets";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <img className="logoImg" src={logo} alt="Logo" />

        <ul>
          <li>
            <Link to="home">Welcome</Link>
          </li>
          <li>
            <Link to="approvals">Approvals</Link>
          </li>
          <li>
            <Link to="adopted">Adopted Pets</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-buttonB">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="home" element={<Welcome />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="adopted" element={<AdoptedPets />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
