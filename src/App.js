import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './Components/Layouts/LoadingSpinner';
import {jwtDecode} from 'jwt-decode';

const SignUp = React.lazy(() => import('./Auth/signup'));
const Login = React.lazy(() => import('./Auth/login'));
const HomePage = React.lazy(() => import('./Components/Pages/HomePage'));
const AdminDashboard = React.lazy(() => import('./Components/Dashboard/AdminDashboard'));
const WholeSalerDashboard = React.lazy(() => import('./Components/Dashboard/WholeSalerDashboard'));
const CorporateDashboard = React.lazy(() => import('./Components/Dashboard/CorporateDashboard'));
const UpdateProfile = React.lazy(() => import('./Components/Pages/UpdateProfilePage'));
const AddProduct = React.lazy(() => import('./Components/Pages/AddProductPage'));
const Sidebar = React.lazy(() => import('./Components/Layouts/Sidebar'));
const Footer = React.lazy(() => import('./Components/Layouts/Footer'));
const WholesalerProfilePage = React.lazy(() => import('./Components/Pages/WholesalerProfile'));

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token has expired; log out user
          handleLogout();
        } else {
          // Token is valid; proceed with login
          setIsLoggedIn(true);
          setUserId(decodedToken.sub);
          setUserRole(localStorage.getItem('role'));
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleLogout();  // Logout if there's an error decoding the token
      }
    }
  }, [handleLogout]);

  return (
    <Container fluid>
      {isLoggedIn && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1050 }}>
          <Sidebar />
        </div>
      )}

      <Row>
        <Col className="content" style={{margin:"0px", padding:"0px"}}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
              <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
              <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} /> : <Navigate to="/dashboard" />} />

              {isLoggedIn && (
                <>
                  <Route path="/dashboard" element={
                    userRole === 'admin' ? (
                      <AdminDashboard />
                    ) : userRole === 'corporate' ? (
                      <CorporateDashboard />
                    ) : userRole === 'wholesaler' ? (
                      <WholeSalerDashboard userId={userId} />
                    ) : (
                      <Navigate to="/" />
                    )
                  } />
                  <Route path="/update-profile" element={<UpdateProfile userId={userId} />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/wholesaler/:id" element={<WholesalerProfilePage />} />
                </>
              )}
            </Routes>
          </Suspense>
        </Col>
      </Row>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      )}
    </Container>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
