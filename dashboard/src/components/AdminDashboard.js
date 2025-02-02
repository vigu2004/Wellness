import React, { useState, useEffect } from 'react';
import AddSessionForm from './AddSessionForm';
import './Dashboard.css';
import AddExpertForm from './AddExpertForm';

const AdminDashboard = () => {
  const [showAddSessionForm, setShowAddSessionForm] = useState(false);
  const [showExpertForm, setShowExpertForm] = useState(false);

  const [allSessions, setAllSessions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allExperts, setAllExperts] = useState([]);

  useEffect(()=>{
    const getAllSessions = async() =>{
      try{
        const response = await fetch('http://localhost:5000/api/getAllSessions');
        const result = await response.json();

        if (response.ok) {
          setAllSessions(result); 
        } else {
          console.error("Failed to get all sessions");
          alert("Failed to get all sessions");
        }
      }
      
      catch(error){
        console.error('Error fetching all sessions:', error);
        alert("An error occurred while fetching all sessions");
      }
    };

    const getAllUsers = async() =>{
      try{
        const response = await fetch('http://localhost:5000/api/getAllUsers');
        const result = await response.json();

        if (response.ok) {
          setAllUsers(result); 
        } else {
          console.error("Failed to get all users");
          alert("Failed to get all users");
        }
      }
      
      catch(error){
        console.error('Error fetching all users:', error);
        alert("An error occurred while fetching all users");
      }
    };

    const getAllExperts = async() =>{
      try{
        const response = await fetch('http://localhost:5000/api/getAllExperts');
        const result = await response.json();

        if (response.ok) {
          setAllExperts(result); 
        } else {
          console.error("Failed to get all experts");
          alert("Failed to get all experts");
        }
      }
      
      catch(error){
        console.error('Error fetching all experts:', error);
        alert("An error occurred while fetching all experts");
      }
    };
    getAllSessions();
    getAllUsers();
    getAllExperts();
  },[])

  const handleAddSessionClick = () => {
    setShowAddSessionForm(true);
  };

  const handleAddExpert = () =>{
    setShowExpertForm(true);
  }

  const closeForm = () => {
    setShowAddSessionForm(false);
  };

  const closeForm2 = () => {
    setShowExpertForm(false);
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
            <button onClick={handleAddExpert} className="button-secondary">Add Expert</button>

          </div>
        </section>

        <section className="dashboard-stats">
          <div className="card" id='card1'>
          <a href='#sesT' style={{textDecorationColor:'white'}}><p>25</p></a>
            <h3>Total Sessions</h3>
            
          </div>
          <div className="card" id='card2'>
          <a href='#memT' style={{textDecorationColor:'white'}}><p>325</p></a>
            <h3>Total Members</h3>
            
          </div>
          <div className="card" id='card3'>
          <a href='#expT' style={{textDecorationColor:'white'}}><p>8</p></a>
            <h3>Total Members</h3>
            
          </div>
        </section>

        

        {showAddSessionForm && <AddSessionForm closeForm={closeForm} />}
        {showExpertForm && <AddExpertForm closeForm={closeForm2} />}
      </div>
      <div className='tableCont'>
        <div className='tableBox'>
          <h1 id='sesT'>Session details</h1>
          <button className="button-primary">Export to excel</button>
          <div className='innerTable' >
            <table>
              <thead>
                <tr>                  
                  <th>Session Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Batch</th>
                  <th>Expert</th>
                  <th>Edit details</th>
                </tr>
              </thead>
              <tbody>
                {allSessions.map((sessions) => (
                  <tr key={sessions.id}>
                    <td>{sessions.sessionName}</td>
                    <td>{sessions.date}</td>
                    <td>{sessions.time}</td>
                    <td>{sessions.batch}</td>
                    <td>{sessions.expert}</td>
                    <td><a href=''>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        
      </div>
          <br></br><br></br>
      <div className='tableCont'>
        <div className='tableBox'>
          <h1 id='memT'>User details</h1>
          <button className="button-primary">Export to excel</button>
          <div className='innerTable'>
            <table>
              <thead>
                <tr>
                  <th style={{backgroundColor:'#1bcfb4'}}>UserID</th>
                  <th style={{backgroundColor:'#1bcfb4'}}>Name</th>
                  <th style={{backgroundColor:'#1bcfb4'}}>Phone</th>
                  <th style={{backgroundColor:'#1bcfb4'}}>Email</th>
                  <th style={{backgroundColor:'#1bcfb4'}}>Batch</th>
                  <th style={{backgroundColor:'#1bcfb4'}}>Edit details</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((users) => (
                  <tr key={users.id}>
                    
                    <td>{users.full_name}</td>
                    <td>{users.phone}</td>
                    <td>{users.email}</td>
                    <td>{users.batch_id}</td>
                    <td>{users.wellness_goal}</td>
                    <td><a href=''>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
      
      </div>
      <br></br><br></br>
      <div className='tableCont'>
        <div className='tableBox'>
          <h1 id='expT'>Expert details</h1>
          <button className="button-primary">Export to excel</button>
          <div className='innerTable'>
            <table>
              <thead>
                <tr>
                  
                  <th style={{backgroundColor:'#fe9496'}}>Name</th>
                  <th style={{backgroundColor:'#fe9496'}}>Phone</th>
                  <th style={{backgroundColor:'#fe9496'}}>Email</th>
                  <th style={{backgroundColor:'#fe9496'}}>age</th>
                  <th style={{backgroundColor:'#fe9496'}}>Edit details</th>
                </tr>
              </thead>
              <tbody>
                {allExperts.map((experts) => (
                  <tr key={experts.id}>                    
                    <td>{experts.name}</td>                   
                    <td>{experts.phone}</td>
                    <td>{experts.email}</td>
                    <td>{experts.age}</td>
                    <td><a href=''>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
      
      </div>
      
    </div>
  );
};

export default AdminDashboard;
