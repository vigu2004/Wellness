import React, { useState } from 'react';
import AddSessionForm from './AddSessionForm';
import './Dashboard.css';

const AdminDashboard = () => {
  const [showAddSessionForm, setShowAddSessionForm] = useState(false);

  const handleAddSessionClick = () => {
    setShowAddSessionForm(true);
  };

  const closeForm = () => {
    setShowAddSessionForm(false);
  };

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="logo">
          <span>Wellness Program</span>
        </div>
        <nav className="navbar-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#sessions">Sessions</a></li>
            <li><a href="#members">Members</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </section>

        <section className="dashboard-stats">
          <div className="card">
            <h3>Total Sessions</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>Total Members</h3>
            <p>150</p>
          </div>
        </section>

        <section className="session-management">
          <h1>Manage Sessions ------------> </h1> 
          <div className="action-buttons">
            <button onClick={handleAddSessionClick} className="button-primary">
              Add New Session
            </button>
            <button className="button-secondary">Edit Sessions</button>
            <button className="button-secondary">Delete Sessions</button>
          </div>
        </section>

        {showAddSessionForm && <AddSessionForm closeForm={closeForm} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
