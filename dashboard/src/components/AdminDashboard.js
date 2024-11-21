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
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <nav className="dashboard-nav">
          <ul>
            <li>Home</li>
            <li>Sessions</li>
            <li>Members</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Sessions</h3>
            <p>25</p>
          </div>
          <div className="stat-card">
            <h3>Total Members</h3>
            <p>150</p>
          </div>
        </section>

        <section className="session-management">
          <h2>Manage Sessions</h2>
          <div className="action-buttons">
            <button onClick={handleAddSessionClick} className="button-primary">
              Add New Session
            </button>
            <button className="button-secondary">Edit Sessions</button>
            <button className="button-secondary">Delete Sessions</button>
          </div>
        </section>

        {showAddSessionForm && <AddSessionForm closeForm={closeForm} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
