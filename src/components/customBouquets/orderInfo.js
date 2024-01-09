// OrderInfo.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "./orderInfo.css";
import emailjs from "@emailjs/browser";

const phone_Number = "(951) 591-3297";
const phoneLink = `tel:${phone_Number}`;

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
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    );
  };

  const form = useRef();

  const [user_name, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user_email, setEmail] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [itemInfo, setItemInfo] = useState([]);

  const emailValidation = () => {
    return String(user_email)
      .toLocaleLowerCase()
      .match(/^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Update the hidden fields based on cart items
  const updatedItemInfo = cartItems.map((item) => ({
    imageSrc: item.imageSrc || "",
    title: item.title || "",
    price: item.price || "",
    quantity: item.quantity || "",
  }));

  // Update the state with the new item information
  useEffect(() => {
    setItemInfo(updatedItemInfo);
  }, [updatedItemInfo]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (user_name === "") {
      setErrMsg("Username is required!!");
    } else if (phoneNumber === "") {
      setErrMsg("Phone number is required!");
    } else if (user_email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(user_email)) {
      setErrMsg("Give a valid Email!");
    } else if (deliveryDate === "") {
      setErrMsg("Please give your Delivery Date");
    } else {
      try {
        // Send the email using the form data and the updated itemInfo
        await emailjs.sendForm(
          "service_p0jbhyl",
          "template_6iliax4",
          form.current,
          "Ah9VqXeck2rq2S5Me"
        );

        setSuccessMsg(
          `Thank you ${user_name}, Your Message has been sent Successfully!`
        );
        setErrMsg("");
        setUsername("");
        setPhoneNumber("");
        setEmail("");
        setDeliveryDate("");
        setMessage("");
        setItemInfo([]); // Reset order information after sending
      } catch (error) {
        console.error("Error sending email:", error);
        setErrMsg("Error sending email. Please try again.");
        setSuccessMsg("");
      }
    }
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
          {phone_Number}
        </a>
      </div>
      <div
        ref={ref}
        className={`fancyContainer ${inView ? "zoomIn" : "zoomOut"}`}
      >
        {/* ... (rest of the fancyContainer code) ... */}
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
      <br />
      <br />

      <div
        ref={ref}
        className={`contact-form ${inView ? "zoomIn" : "zoomOut"}`}
      >
        <form ref={form} className="combined-form">
          {errMsg && <p className="error-msg">{errMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <div className="form-group">
            <div className="input-group">
              <h1 className="label">YOUR NAME</h1>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={user_name}
                name="user_name"
                className={`${
                  errMsg === "Username is required!" && "outline-designColor"
                } contact-input`}
                type="text"
              />
            </div>
            <div className="input-group">
              <h1 className="label">Phone Number</h1>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                name="phoneNumber"
                className={`${
                  errMsg === "Phone number is required!" &&
                  "outline-designColor"
                } contact-input`}
                type="text"
              />
            </div>
          </div>
          <div className="input-group">
            <h1 className="label">Email</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={user_email}
              name="user_email"
              className={`${
                errMsg === "Please give your Email!" && "outline-designColor"
              } contact-input`}
              type="email"
            />
          </div>
          <div className="input-group">
            <h1 className="label">Desired Delivery Date</h1>
            <input
              onChange={(e) => setDeliveryDate(e.target.value)}
              name="Desired Delivery Date"
              value={deliveryDate}
              className={`${
                errMsg === "Please give a Delivery Date!" &&
                "outline-designColor"
              } contact-input`}
              type="text"
            />
          </div>
          <div className="input-group">
            <h1 className="label">Special Request</h1>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name="message"
              className={`${
                errMsg === "Message is required!" && "outline-designColor"
              } contact-textarea`}
              cols="30"
              rows="8"
            ></textarea>
          </div>

          {/* Order Information Fields */}
          {cartItems.map((item, index) => (
            <div key={index} className="hidden-item-info">
              <input type="hidden" name="imgSrc" value={item.imageSrc || ""} />
              <input type="hidden" name="title" value={item.title || ""} />
              <input type="hidden" name="price" value={item.price || ""} />
              <input
                type="hidden"
                name="quantity"
                value={item.quantity || ""}
              />
              {/* Add more hidden fields for other item details if needed */}
            </div>
          ))}
          <input type="hidden" name="total" value={calculateTotalPrice()} />

          <div className="full-width">
            <button onClick={handleSend} className="send-button">
              Send Message
            </button>
          </div>
          {errMsg && <p className="error-msg">{errMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />

      <footer className="Footer">
        <div className="footer-content">
          <div className="left-content">
            <h1>Hecho Por Jenny &copy; 2023</h1>
          </div>
          <div className="right-content">
            <a
              href="https://aldahir-cornejo-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>Site Design</h1>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default OrderInfo;
