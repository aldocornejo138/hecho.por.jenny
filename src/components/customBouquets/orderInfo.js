// OrderInfo.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "./orderInfo.css";

const phoneNumber = "(951) 591-3297";
const phoneLink = `tel:${phoneNumber}`;

const OrderInfo = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const Title = ({ title, subtitle }) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
    });

    return (
      <div ref={ref} className={`Title ${inView ? "zoomIn" : "zoomOut"}`}>
        <h1> {title}</h1>
        <p>{subtitle}</p>
      </div>
    );
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = item.quantity || 0;

      if (!isNaN(itemPrice)) {
        return total + itemPrice * itemQuantity;
      } else {
        console.error(`Invalid price for item: ${item.title}`);
        return total;
      }
    }, 0);

    return totalPrice.toFixed(2);
  };

  return (
    <section className="main">
      <div className="head">
        <Link
          to="/"
          className="headLogo"
          style={{ textDecoration: "none", fontSize: "10px" }}
        >
          <h1>Hecho Por Jenny</h1>
        </Link>
        <a className="headNumber" href={phoneLink}>
          {phoneNumber}
        </a>
      </div>
      <div
        ref={ref}
        className={`fancyContainer ${inView ? "zoomIn" : "zoomOut"}`}
      >
        <div className="Fancy_Title">
          <h1>Hecho Por Jenny</h1>
        </div>
        <div className=" svgLineContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="347"
            height="80"
            version="1.1"
          >
            <path id="textPath" d="M 10 50 H 400" fill="transparent" />
            <text className="cursive-text">
              <textPath href="#textPath">
                <animateMotion repeatCount="indefinite">
                  <mpath
                    href="#textPath"
                    keyPoints="0;1;0"
                    keyTimes="0;0.5;1"
                    dur="4s"
                  />
                </animateMotion>
                Hecho Por Jenny
              </textPath>
            </text>
          </svg>
        </div>

        <div className="svgFlower">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="40"
            version="1.1"
          >
            <path
              id="line"
              d="M 10 20 C 100 5, 150 35, 350 20"
              fill="none"
              strokeWidth="3.5"
              strokeDasharray="200 300"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="500"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>

            <path
              id="inverseLine"
              d="M 350 20 C 250 35, 200 5, 10 20"
              fill="none"
              stroke-width="4"
              stroke-dasharray="200 300"
              stroke-linecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="-500"
                to="0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
      <div className="orderDetails">
        <h2>Order Details</h2>
        {cartItems.length === 0 ? (
          <p>No Items In Order</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="orderItem">
                    <div className="itemInfo">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="miniatureImage"
                      />
                      <p className="itemTitle">{item.title}</p>
                      <p className="itemPrice">${item.price}</p>
                      <p className="itemQuantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="totalPrice">
              <p>
                <span style={{ color: "white" }}>Total:</span>
                <span style={{ color: "rgb(0, 255, 94)" }}>
                  ${calculateTotalPrice()}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <Title
        title="Shipping Address"
        subtitle="Special Request? Leave a note :)"
      />
    </section>
  );
};

export default OrderInfo;
