import React, { useState } from "react";
import "./products.css";
import { useInView } from "react-intersection-observer";
import Overlay from "./Overlay";

const ProductCard = ({ imageSrc, title, price }) => {
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
        <h3>{price}</h3>
      </div>

      {isOverlayOpen && (
        <Overlay isOpen={isOverlayOpen} onClose={closeOverlay}>
          <img className="card" src={imageSrc} alt={title} />
          <h2>{title}</h2>
          <h3>{price}</h3>
          <button className="product-details-button">Request</button>
        </Overlay>
      )}
    </div>
  );
};

const Products = () => {
  const productsData = [
    {
      imageSrc: "pic-1.jpg",
      title: "Product 1",
      price: "$150",
    },
    {
      imageSrc: "pic-2.jpg",
      title: "Product 2",
      price: "$150",
    },
    {
      imageSrc: "url_to_your_image_3",
      title: "Product 3",
      price: "$150",
    },
    {
      imageSrc: "url_to_your_image_4",
      title: "Product 4",
      price: "$150",
    },
    {
      imageSrc: "url_to_your_image_5",
      title: "Product 5",
      price: "$150",
    },
  ];

  return (
    <div className="product-container">
      {productsData.map((product, index) => (
        <div className="emptyDiv" key={index}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
