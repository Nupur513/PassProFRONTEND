import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './screens/Landingpage';
import Register from './screens/Register';
import Login from './screens/Login';
import DashboardWarden from './screens/DashboardWarden';
import PendingRequests from './screens/PendingRequests';
import ApprovedOutpasses from './screens/ApprovedOutpasses';
import DashboardStudent from './screens/DashboardStudent';
import ApplyOutpass from './screens/ApplyOutpass'; // Import ApplyOutpass component
import CheckStatus from './screens/CheckStatus';
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
          <Route path="/warden/pending-requests" element={<PendingRequests />} />
          <Route path="/warden/approved-outpasses" element={<ApprovedOutpasses />} />
          <Route path="/student/dashboard" element={<DashboardStudent />} />
          <Route path="/student/apply-outpass" element={<ApplyOutpass />} /> {/* Route for ApplyOutpass */}
          <Route path="/student/check-status" element={<CheckStatus />}/>
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

