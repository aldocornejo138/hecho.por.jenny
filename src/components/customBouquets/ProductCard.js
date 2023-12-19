import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Overlay from "./Overlay";
import "./products.css";

const ProductCard = ({ imageSrc, title, price, addToCart }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div className="product-details">
      <div
        onClick={openOverlay}
        ref={ref}
        className={`card ${inView ? "zoomIn" : "zoomOut"}`}
      >
        <img src={imageSrc} alt={title} />
      </div>
      <div
        ref={ref}
        className={`product-details ${inView ? "zoomIn" : "zoomOut"}`}
      >
        <h2>{title}</h2>
        <h3>${price}</h3>
      </div>
      {isOverlayOpen && (
        <Overlay isOpen={isOverlayOpen} onClose={closeOverlay}>
          <img className="card" src={String(imageSrc)} alt={String(title)} />
          <h2>{String(title)}</h2>
          <h3>${String(price)}</h3>
          <button className="product-details-button" onClick={addToCart}>
            Add To Cart
          </button>
        </Overlay>
      )}
    </div>
  );
};

export default ProductCard;
