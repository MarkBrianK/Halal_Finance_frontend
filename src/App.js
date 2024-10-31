import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './Components/Layouts/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';
import axios from './Components/utilis/axiosConfig';
import Header from './Components/Layouts/Header';
import Wallet from './Components/Pages/Wallet';
import { CartProvider } from './Components/Pages/CartContext';

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
const Cart = React.lazy(() => import('./Components/Pages/Cart'));
const Confirm = React.lazy(() => import('./Auth/confirmPage'));
const Notification = React.lazy(()=> import('./Components/Pages/Notification'))

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserId(null);
        setUserRole(null);
        setUserProfile(null);
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
                    handleLogout();
                } else {
                    setIsLoggedIn(true);
                    setUserId(decodedToken.sub);
                    setUserRole(localStorage.getItem('role'));

                    // Fetch user profile
                    const fetchUserProfile = async () => {
                        try {
                            const response = await axios.get(`/profiles/current`);
                            const profileData = response.data;
                            setUserProfile(profileData);

                            // Redirect to update profile if the name is null
                            if (!profileData.name) {
                                navigate('/update-profile');
                            }
                        } catch (error) {
                            console.error('Error fetching user profile:', error);
                        }
                    };
                    fetchUserProfile();
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                handleLogout();
            }
        }
    }, [handleLogout, navigate]);

    const showHeader = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/confirm';

    return (
        <Container fluid>
            {showHeader && <Header user={userProfile} userId={userId} />}
            {isLoggedIn && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1050 }}>
                    <Sidebar />
                </div>
            )}

            <Row>
                <Col className="content" style={{ margin: "0px", padding: "0px" }}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
                            <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
                            <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} /> : <Navigate to="/dashboard" />} />
                            <Route path="/confirm" element={!isLoggedIn ? <Confirm /> : <Navigate to="/" />} />
                            <Route path="/dashboard" element={
                                userRole === 'admin' ? (
                                    <AdminDashboard />
                                ) : userRole === 'corporate' ? (
                                    <CorporateDashboard />
                                ) : userRole === 'wholesaler' ? (
                                    <WholeSalerDashboard userId={userId} />
                                ) : (
                                    <div></div>
                                )
                            } />

                            {isLoggedIn && (
                                <>
                                    <Route path="/update-profile" element={<UpdateProfile userId={userId} />} />
                                    <Route path="/add-product" element={<AddProduct />} />
                                    <Route path="/wholesaler/:id" element={<WholesalerProfilePage />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/wallet" element={<Wallet userId={userId} />} />
                                    <Route path = "/notifications" element = {<Notification />} />
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
        <CartProvider>
            <App />
        </CartProvider>
    </Router>
);

export default WrappedApp;
