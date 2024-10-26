import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './Components/Layouts/LoadingSpinner'; 
import { jwtDecode } from 'jwt-decode';


const SignUp = React.lazy(() => import('./Auth/signup'));
const Login = React.lazy(() => import('./Auth/login'));
const HomePage = React.lazy(() => import('./Components/Pages/HomePage'));
const Logout = React.lazy(() => import('./Auth/logout'));
const AdminDashboard = React.lazy(() => import('./Components/Dashboard/AdminDashboard'));
const WholeSalerDashboard = React.lazy(() => import('./Components/Dashboard/WholeSalerDashboard'));
const CorporateDashboard = React.lazy(() => import('./Components/Dashboard/CorporateDashboard'));
const UpdateProfile = React.lazy(() => import('./Components/Pages/UpdateProfilePage'));
const AddProduct = React.lazy(() => import('./Components/Pages/AddProductPage'));
const Sidebar = React.lazy(() => import('./Components/Layouts/Sidebar'));
const Footer = React.lazy(() => import('./Components/Layouts/Footer'));

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

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
      {isLoggedIn && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1050 }}>
          <Sidebar />
        </div>
      )}

      <Row>
        <Col className="content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
              <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
              <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} /> : <Navigate to="/dashboard" />} />
              <Route path="/logout" element={<Logout />} />

              {/* Handle dashboard redirection */}
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
