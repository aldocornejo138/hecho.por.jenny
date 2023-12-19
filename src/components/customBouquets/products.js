import React from "react";
import ProductCard from "./ProductCard";
import "./products.css";
import productsData from "./productsData";

const Products = ({ addToCart }) => {
  return (
    <div className="product-container">
      {productsData.map((product, index) => (
        <div className="emptyDiv" key={index}>
          <ProductCard
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            addToCart={() =>
              addToCart(
                product.title,
                product.price,
                product.imageSrc,
                product.id
              )
            } // Pass individual properties to addToCart
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
