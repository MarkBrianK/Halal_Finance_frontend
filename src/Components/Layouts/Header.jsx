import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaShoppingCart, FaWallet, FaBell } from 'react-icons/fa';
import logo from '../../Assets/Images/halal_logo.jpeg';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';
import { useCart } from '../Pages/CartContext';

const Header = ({ user, userId }) => {
    const [greeting, setGreeting] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    useEffect(() => {
        const currentHour = new Date().getHours();
        const greetingMessage =
            currentHour < 12 ? 'Good Morning' :
            currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
        setGreeting(greetingMessage);

        if (userId) {
            const fetchWalletBalance = async () => {
                try {
                    const response = await axios.get(`/wallets/${userId}`);
                    setWalletBalance(parseFloat(response.data.balance) || 0);
                } catch (error) {
                    console.error('Error fetching wallet balance:', error);
                }
            };

            fetchWalletBalance();
        }
    }, [userId]);

    const styles = {
        navbar: {
            background: 'linear-gradient(90deg, black, gold)',
            color: 'white',
            padding: '10px 0'
        },
        profilePicture: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        greetingText: {
            fontSize: '1.2rem',
            color: 'white',
            marginLeft: '10px'
        },
        logo: {
            maxWidth: '80px',
            height: 'auto',
            borderRadius: '50%'
        },
        iconLink: {
            position: 'relative',
            color: 'white',
            textDecoration: 'none',
            marginRight: '15px'
        },
        iconBadge: {
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            fontSize: '0.75rem',
            padding: '2px 6px'
        },
        iconText: {
            fontSize: '1rem',
            marginLeft: '5px'
        }
    };

    return (
        <Navbar expand="lg" style={styles.navbar}>
            <Container fluid>
                <Row className="w-100 align-items-center">
                    {user ? (
                        <>
                            <Col xs="auto" className="d-flex align-items-center">
                                {user?.profile_picture && (
                                    <Image
                                        cloudName="djmvocl1y"
                                        publicId={user.profile_picture}
                                        alt="Profile Picture"
                                        style={styles.profilePicture}
                                    />
                                )}
                                <div style={styles.greetingText}>
                                    {greeting}, {user?.name || 'User'}!
                                </div>
                            </Col>

                            <Col className="text-center">
                                <img src={logo} alt="Company Logo" style={styles.logo} />
                            </Col>

                            <Col xs="auto" className="d-flex justify-content-end">
                                <Link to="/cart" style={styles.iconLink}>
                                    <FaShoppingCart size={25} />
                                    {cartCount > 0 && (
                                        <Badge pill style={styles.iconBadge}>
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Link>

                                <Link to="/wallet" style={styles.iconLink}>
                                    <FaWallet size={25} />
                                    <span style={styles.iconText}>Ksh {walletBalance.toFixed(2)}</span>
                                </Link>

                                <Link to="/notifications" style={styles.iconLink}>
                                    <FaBell size={25} />
                                    <Badge pill style={styles.iconBadge}>
                                        3
                                    </Badge>
                                </Link>
                            </Col>
                        </>
                    ) : (
                        <Col className="d-flex justify-content-between align-items-center w-100">
                            <img src={logo} alt="Company Logo" style={styles.logo} />
                            <Link to="/login">
                                <Button variant="light">Login</Button>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        </Navbar>
    );
};

export default Header;
