import React, { useState, useEffect } from 'react';
import './AddSessionForm.css';

const AddExpertForm = ({ closeForm }) => {
  const [expertName, setExpertName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expertsData = {
      expertName,
      age,
      email,
      phone, // Send batch ID
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/createExpert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expertsData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Expert- "${expertName}" added successfully!`);
        closeForm();
      } else {
        alert(`Failed to add expert: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding expert:', error);
      alert('An error occurred while adding the expert.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="form-container">
        <h2>Add New Expert</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Expert Name:
            <input
              type="text"
              value={expertName}
              onChange={(e) => setExpertName(e.target.value)}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label>
            Expert Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Expert Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="submit" className="button-secondary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Session'}
            </button>
            <button type="button" className="button-secondary" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpertForm;
