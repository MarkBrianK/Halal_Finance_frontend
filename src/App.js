import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SignUp from './Auth/signup';
import Login from './Auth/login';
import HomePage from './Components/Pages/HomePage';
import NavBar from './Components/Layouts/Sidebar';

const App = () => {
  const location = useLocation();

  const showSidebar = location.pathname === "/";

  return (
    <Container fluid>
      <Row>
        {showSidebar && (
          <Col md={3} className="sidebar">
            <NavBar />
          </Col>
        )}
        <Col md={showSidebar ? 6 : 9} className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
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
