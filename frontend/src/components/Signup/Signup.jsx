import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',  // Changed from 'name' to 'full_name'
    email: '',
    phone: '',
    dob: '',
    wellness_goal: '',  // Changed from 'goals' to 'wellness_goal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`User registered successfully with ID: ${result.user_id}`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('An error occurred while registering. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"  // Changed from 'name' to 'full_name'
              name="full_name"  // Changed from 'name' to 'full_name'
              value={formData.full_name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.phone}
              onChange={handleChange}
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
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="wellness_goal">Wellness Goals</label>
            <select
              id="wellness_goal"  // Changed from 'goals' to 'wellness_goal'
              name="wellness_goal"  // Changed from 'goals' to 'wellness_goal'
              value={formData.wellness_goal}
              onChange={handleChange}
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
