import "./HeroStyles.css";
import { useState, useEffect } from "react";
import imageSlide from "./data";

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
    weight: "100%",
    transition: "background-image 1s ease",
  };

  return (
    <div className="backgroundMain">
      <div className="countiner-style">
        <div style={bgImageStyle}></div>
        <div className="description">
          <div>
            <h2>{imageSlide[currentState].title}</h2>
            <h1>{imageSlide[currentState].body}</h1>
          </div>
        </div>
        <div className="transparent-background"></div>
        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
export default Hero;
