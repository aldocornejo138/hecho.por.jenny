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
    transition: "background-image 2s ease-in-out",
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
        <div className="title">
          <h1>Hecho Por Jenny</h1>
        </div>

        <div className="svg-line-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="100"
            version="1.1"
          >
            <path
              d="M 0 40 
         C 50 10 50 90 100 40
         C 150 -10 150 110 200 40"
              fill="none"
              stroke="#ff33cc"
              stroke-width="2"
            >
              <animate
                attributeName="d"
                from="M 0 40 C 50 10 50 90 100 40 C 150 -10 150 110 200 40"
                to="M 0 40 C 30 10 30 90 60 40 C 90 -10 90 110 120 40"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        {/* SVG line right under the title 
        <div className="svg-line-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="200"
            version="1.1"
          >
            <path
              d="M10,100 Q70,170 150,115 T400,150"
              fill="none"
              stroke="#ff33cc"
              stroke-width="2"
            />
          </svg>
        </div>
  */}

        {/* SVG line right under the title */}
        <div className="semi-title">
          <h1>Couture Floral</h1>
        </div>
        <Menu />
        {/* Center the social icons */}
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
