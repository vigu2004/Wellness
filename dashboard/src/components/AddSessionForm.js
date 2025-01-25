import React, { useState } from 'react';
import './AddSessionForm.css';

const AddSessionForm = ({ closeForm }) => {
  const [sessionName, setSessionName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [batch, setBatch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = {
      sessionName,
      date,
      time,
      batch,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Session "${sessionName}" added successfully!`);
        closeForm();
      } else {
        alert(`Failed to add session: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding session:', error);
      alert('An error occurred while adding the session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="form-container">
        <h2>Add New Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Session Name:
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <label>
            Batch:
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            >
              <option value="" disabled>Select Batch</option>
              <option value="Batch A">Batch A</option>
              <option value="Batch B">Batch B</option>
              <option value="Batch C">Batch C</option>
            </select>
          </label>
          <div className="form-buttons">
            <button type="submit" className="button-primary" disabled={isSubmitting}>
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

export default AddSessionForm;
