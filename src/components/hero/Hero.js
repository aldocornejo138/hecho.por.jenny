// Hero.js
import React from "react";
import { useState, useEffect } from "react";
import imageSlide from "./data";
import "./HeroStyles.css"; // Import your CSS file
import Menu from "../menu/Menu.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Hero(props) {
  const [currentState, setCurrentState] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === 4) {
        setCurrentState(0);
      } else {
        setCurrentState(currentState + 1);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentState]);

  const bgImageStyle = {
    backgroundImage: `url(${imageSlide[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    transition: "background-image 1s ease",
  };

  return (
    <div className="backgroundMain">
      <div className="countiner-style">
        <div className="transparent-background"></div>
        <div style={bgImageStyle} className="image-filter-pinkish"></div>
        <div className="description">
          <div>
            <h2>{imageSlide[currentState].title}</h2>
            <h1>{imageSlide[currentState].body}</h1>
          </div>
        </div>

        {/* Add the title in the middle */}
        <div className="title">
          <h1>Hecho Por Jenny</h1>
        </div>
        <div className="semi-title">
          <h1>Couture Floral</h1>
        </div>

        <Menu />

        <div className="social-icons">
          <a
            href="https://www.facebook.com/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className="icon" />
          </a>
          <a
            href="https://www.instagram.com/your-instagram-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
