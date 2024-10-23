import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SignUp from './Auth/signup';
import Login from './Auth/login';
import HomePage from './Components/Pages/HomePage';
import NavBar from './Components/Layouts/Sidebar';
import Logout from './Auth/logout';
import BorrowerDashboard from './Components/Dashboard/BorrowerDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import InvestorDashboard from './Components/Dashboard/InvestorDashboard';
import PitchList from './Components/Pitches/PitchList';
import AddPitch from './Components/Pitches/AddPitch';
import UpdatePitch from './Components/Pitches/UpdatePitch';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const showSidebar = isLoggedIn;

  return (
    <Container fluid>
      <Row>
        {showSidebar && (
          <Col md={3} className="sidebar">
            <NavBar />
          </Col>
        )}
        <Col md={showSidebar ? 9 : 12} className="content">
          <Routes>
            {/* Default Route Logic */}
            <Route path="/" element={isLoggedIn ? (
              userRole === 'borrower' ? <BorrowerDashboard /> :
              userRole === 'admin' ? <AdminDashboard /> :
              <InvestorDashboard />
            ) : (
              <HomePage />
            )} />

            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={(role) => { setIsLoggedIn(true); setUserRole(role); }} />} />
            <Route path="/logout" element={<Logout onLogout={() => { setIsLoggedIn(false); setUserRole(null); }} />} />

            {/* Pitch List Routes */}
            <Route path="/pitches" element={isLoggedIn ? (
              userRole === 'admin' ? <PitchList showAllPitches={true} /> :
              userRole === 'borrower' ? <PitchList showMyPitches={true} /> :
              userRole === 'investor' ? <PitchList showInvestorPitches={true} /> :
              <Navigate to="/" />
            ) : <Navigate to="/login" />} />

            <Route path="/add-pitch" element={userRole === 'borrower' ? <AddPitch /> : <Navigate to="/" />} />
            <Route path="/update-pitch" element={userRole === 'borrower' ? <UpdatePitch /> : <Navigate to="/" />} />

            {/* Catch-all for non-existent routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
