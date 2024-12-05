
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from '../assets/images/whiskers-logo.svg';

const Auth = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "individual",
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(url, form);

      const user = response.data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate(response.data.redirect);
    } catch (error) {
      console.error("Error during authentication", error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
