import './App.css'; 
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import WithAuth from './WithAuth';

function App() {
  const ProtectedDashboard = WithAuth(Dashboard);
  return (
    <div className="App">
      <h1>Authentication Example</h1>
      
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          </Routes>
      
    </div>
  );
}

export default App;
