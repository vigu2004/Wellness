import React from "react";
import "../styles/PricingCard.css";

const PricingCard = ({ title, price, storage, users, sendUp }) => {
  const formattedPrice = Number(price).toFixed(2) || 'N/A';

  return (
    <div className="PricingCard">
      <header>
        <h2 className="card-title">{title}</h2>
        <div className="card-price">{formattedPrice}</div>
      </header>
      <div className="card-features">
        <div>{storage}</div>
        <div>Users: {users}</div>
        {sendUp && <div>Send Up: {sendUp}</div>}
      </div>
      <button className="card-btn">Select Plan</button>
    </div>
  );
};

export default PricingCard;
