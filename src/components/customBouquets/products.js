import React from "react";
import "./products.css";

const ProductCard = ({ imageSrc, title }) => (
  <div className="card">
    <img src={imageSrc} alt={title} />
    <h2>{title}</h2>
  </div>
);

const products = () => {
  const productsData = [
    {
      imageSrc: "url_to_your_image_1",
      title: "Product 1",
    },
    {
      imageSrc: "url_to_your_image_2",
      title: "Product 2",
    },
    {
      imageSrc: "url_to_your_image_3",
      title: "Product 3",
    },
    {
      imageSrc: "url_to_your_image_4",
      title: "Product 3",
    },
    {
      imageSrc: "url_to_your_image_5",
      title: "Product 3",
    },
  ];

  return (
    <div className="product-container">
      {productsData.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default products;
