import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './screens/Landingpage';
import Register from './screens/Register';
import Login from './screens/Login';
import DashboardWarden from './screens/DashboardWarden';
import PendingRequests from './screens/PendingRequests'; // Import PendingRequests component
import ApprovedOutpasses from './screens/ApprovedOutpasses'; // Import ApprovedOutpasses component
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/warden/dashboard" element={<DashboardWarden />} />
          <Route path="/warden/pending-requests" element={<PendingRequests />} /> {/* Route for PendingRequests */}
          <Route path="/warden/approved-outpasses" element={<ApprovedOutpasses />} /> {/* Route for ApprovedOutpasses */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
