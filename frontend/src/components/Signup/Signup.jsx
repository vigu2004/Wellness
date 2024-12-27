import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Welcome to our Wellness Program! Your journey to better health begins now.');
  };

  return (
    <div className="signup-container">
      <div className="background-pattern"></div>
      <div className="fitness-icon fitness-icon-left"></div>
      <div className="fitness-icon fitness-icon-right"></div>
      
      <div className="signup-form">
        <div className="form-icon"></div>
        <h2>Join Our Wellness Journey</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              required
              pattern="[0-9]{10}"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="goals">Wellness Goals</label>
            <select
              id="goals"
              name="goals"
              required
            >
              <option value="">Select your primary goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="stress-reduction">Stress Reduction</option>
              <option value="better-sleep">Better Sleep</option>
              <option value="nutrition">Improved Nutrition</option>
            </select>
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Start Your Wellness Journey'}
          </button>
        </form>
        <div className="login-link">
          <p>Already a member?</p>
          <a href="/login">Log In to Your Account</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

