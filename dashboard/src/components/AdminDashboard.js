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
  const data = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 28, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 22, city: "Chicago" },
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 28, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 22, city: "Chicago" },
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 28, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 22, city: "Chicago" },
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 28, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 22, city: "Chicago" },
  ];
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
        
        <section className="session-management">
          
          <div className="action-buttons">
            <button onClick={handleAddSessionClick} className="button-secondary">
              Add New Session
            </button>
            <button className="button-secondary">Add Expert</button>

          </div>
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

        

        {showAddSessionForm && <AddSessionForm closeForm={closeForm} />}
      </div>
      <div className='tableCont'>
        <h1>Session details</h1>
        <button className="button-primary">Export to excel</button>
        <div className='innerTable'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Session Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Batch</th>
                <th>Edit details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.city}</td>
                  <td>{item.city}</td>
                  <td><a href=''>Edit</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
          <br></br><br></br>
      <div className='tableCont'>
      <h1>User details</h1>
      <button className="button-primary">Export to excel</button>
      <div className='innerTable'>
        <table>
          <thead>
            <tr>
              <th style={{backgroundColor:'#1bcfb4'}}>UserID</th>
              <th style={{backgroundColor:'#1bcfb4'}}>Name</th>
              <th style={{backgroundColor:'#1bcfb4'}}>Phone</th>
              <th style={{backgroundColor:'#1bcfb4'}}>Batch Assigned</th>
              <th style={{backgroundColor:'#1bcfb4'}}>Batch</th>
              <th style={{backgroundColor:'#1bcfb4'}}>Edit details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
                <td>{item.city}</td>
                <td><a href=''>Edit</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </div>
      
    </div>
  );
};

export default AdminDashboard;
