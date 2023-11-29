import React from "react";
import "./products.css";

const ProductCard = ({ imageSrc, title }) => (
  <div className="card">
    <img src={imageSrc} alt={title} />
    <h2> {title}</h2>
  </div>
);

const products = () => {
  const productsData = [
    {
      imageSrc: "pic-1.jpg",
      title: "Product 1",
    },
    {
      imageSrc: "pic-2.jpg",
      title: "Product 2",
    },
    {
      imageSrc: "url_to_your_image_3",
      title: "Product 3",
    },
    {
      imageSrc: "url_to_your_image_4",
      title: "Product 4",
    },
    {
      imageSrc: "url_to_your_image_5",
      title: "Product 5",
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
