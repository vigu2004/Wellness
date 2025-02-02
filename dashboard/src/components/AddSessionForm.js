import React, { useState, useEffect } from 'react';
import './AddSessionForm.css';

const AddSessionForm = ({ closeForm }) => {
  const [sessionName, setSessionName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [batch, setBatch] = useState('');
  const [batches, setBatches] = useState([]);
  const[addExpert,setAddExpert] = useState([]);
  const [experts, setExperts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch batches dynamically when the component mounts
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/batches');
        const result = await response.json();

        if (response.ok) {
          setBatches(result); // Set batches to state
        } else {
          console.error("Failed to load batches");
          alert("Failed to load batches");
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
        alert("An error occurred while fetching batches");
      }
    };

    const fetchExperts = async() =>{
      try{
        const response = await fetch('http://localhost:5000/api/getAllExperts');
        const result = await response.json();

        if(response.ok){
          setExperts(result);
        }
        else{
          console.error("Failed to load experts");
          alert("Failed to load experts");
        }
      }
      catch(error){
        console.error('Error fetching experts:', error);
        alert("An error occurred while fetching experts");
      }
    };

    fetchBatches();fetchExperts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = {
      sessionName,
      date,
      time,
      batch, // Send batch ID
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
              {batches.length > 0 ? (
                batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batch_name} {/* Display batch name */}
                  </option>
                ))
              ) : (
                <option disabled>No batches available</option> // Show a fallback message if no batches
              )}
            </select>
          </label>

          <label>
            Add Expert:
            <select
              value={batch}
              onChange={(e) => setExperts(e.target.value)}
              required
            >
              <option value="" disabled>Select Expert</option>
              {batches.length > 0 ? (
                batches.map((experts) => (
                  <option key={experts.id} value={experts.id}>
                    {experts.name} {/* Display expert name */}
                  </option>
                ))
              ) : (
                <option disabled>No experts available</option> // Show a fallback message if no batches
              )}
            </select>
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

export default AddSessionForm;
