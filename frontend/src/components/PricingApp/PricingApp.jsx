import React, { useState } from "react";
import PricingCard from "../PricingCard"; // Import your PricingCard component
import "./PricingApp.css"; // Make sure you have the appropriate styles

const PricingApp = () => {
  const [selectMonthly, setSelectMonthly] = useState(true);

  return (
    <div className="PricingApp">
      <div className="app-container">
        <header>
          <h1 className="header-topic">Our Wellness Pricing Plans</h1>
          <div className="header-row">
            <p>Annually</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => setSelectMonthly((prev) => !prev)}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Monthly</p>
          </div>
        </header>
        <div className="pricing-cards">
          <PricingCard
            title="Essential Wellness"
            price={selectMonthly ? "29.99" : "299.9"}
            storage="Access to Basic Wellness Programs"
            users="1"
            sendUp="1 Wellness Coach"
          />
          <PricingCard
            title="Deluxe Wellness"
            price={selectMonthly ? "49.99" : "499.9"}
            storage="Access to Premium Wellness Programs + Gym"
            users="2"
            sendUp="2 Wellness Coaches"
          />
          <PricingCard
            title="Premium Wellness"
            price={selectMonthly ? "99.99" : "999.9"}
            storage="Unlimited Access to All Programs + Personal Trainer"
            users="5"
            sendUp="5 Wellness Coaches"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingApp;
