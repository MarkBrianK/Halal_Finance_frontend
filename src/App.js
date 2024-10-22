import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SignUp from './Auth/signup';
import Login from './Auth/login';
import HomePage from './Components/Pages/HomePage';
import NavBar from './Components/Layouts/Sidebar';
import Logout from './Auth/logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if the token exists
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
        <Col md={showSidebar ? 6 : 12} className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/logout" element={<Logout onLogout={() => setIsLoggedIn(false)} />} />
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
