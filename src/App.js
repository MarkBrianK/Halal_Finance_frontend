import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SignUp from './Auth/signup';
import Login from './Auth/login';
import HomePage from './Components/Pages/HomePage';
import Sidebar from './Components/Layouts/Sidebar';
import Logout from './Auth/logout';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import WholeSalerDashboard from './Components/Dashboard/WholeSalerDashboard';
import CorporateDashboard from './Components/Dashboard/CorporateDashboard';
import PitchList from './Components/Pitches/PitchList';
import AddPitch from './Components/Pitches/AddPitch';
import UpdatePitch from './Components/Pitches/UpdatePitch';
import { jwtDecode } from 'jwt-decode';
import Footer from './Components/Layouts/Footer';
import AddProduct from './Components/Pages/AddProductPage';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.sub;
        setUserId(user);
        const role = localStorage.getItem('role');
        setUserRole(role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <Container fluid>
      {isLoggedin && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1050 }}>
          <Sidebar />
        </div>
      )}

      <Row>
        <Col className="content">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedin} />} />
            <Route path="/signup" element={!isLoggedin ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/login" element={!isLoggedin ? <Login /> : <Navigate to={`/${userRole}-dashboard`} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/add-product" element={<AddProduct />} />

            {isLoggedin && (
              <>
                <Route path="/wholesaler-dashboard" element={<WholeSalerDashboard userId={userId}/>} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
                <Route path="/pitches" element={<PitchList userId={userId} />} />
                <Route path="/add-pitch" element={<AddPitch />} />
                <Route path="/update-pitch" element={<UpdatePitch />} />
              </>
            )}
          </Routes>
        </Col>
      </Row>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </Container>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
