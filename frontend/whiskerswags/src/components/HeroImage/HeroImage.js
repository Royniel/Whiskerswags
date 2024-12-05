import React from "react";
import "./HeroImage.css";

export default function HeroImage() {
  return (
    <header className="hero-container">
      <div className="p-5 text-center bg-image hero-image-container">
        <div className="overlay"></div>
        <div className="mask">
          <div className="hero-text-container">
            <h1 className="mb-3 main-heading">Find Your Whisky Soulmate</h1>
            <p className="mb-3">
            Our furry companions are eagerly waiting for their forever homes, each with a unique personality and heartwarming story to share. At Whiskers & Wags, we are passionately dedicated to promoting animal welfare and fostering strong, loving bonds between pets and their owners. By adopting a friend, you open your heart to the unconditional love and companionship they offer. Join us in this noble journey of compassion and commitment—let's give our furry friends the loving homes they deserve!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
