import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Container, Carousel as BootstrapCarousel, Card, Button, Form, Toast } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import logo from '../../Assets/Images/halal_logo.jpeg';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';

const HomePage = ({ isLoggedIn }) => {
    const [wholesalers, setWholesalers] = useState([]);
    const [filteredWholesalers, setFilteredWholesalers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count
    const [showToast, setShowToast] = useState(false); // State for showing toast
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWholesalers = async () => {
            try {
                const response = await axios.get('/profiles');
                const wholesalersData = response.data.filter(user => user.role === 'wholesaler');
                setWholesalers(wholesalersData);
                setFilteredWholesalers(wholesalersData);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };
        fetchWholesalers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = wholesalers.map(wholesaler => ({
                ...wholesaler,
                products: wholesaler.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })).filter(wholesaler => wholesaler.products.length > 0);
            setFilteredWholesalers(filtered);
        } else {
            setFilteredWholesalers(wholesalers);
        }
    }, [searchTerm, wholesalers]);

    useEffect(() => {
        if (isLoggedIn) { // Only fetch cart items if user is logged in
            const fetchCartItemCount = async () => {
                try {
                    const response = await axios.get('/cart'); // Endpoint to get cart items
                    setCartItemCount(response.data.cart_items.length || 0); // Update the cart item count
                } catch (error) {
                    console.error('Error fetching cart item count:', error);
                }
            };
            fetchCartItemCount();
        }
    }, [isLoggedIn, cartItemCount]); // Only refetch when logged in and cart count changes

    const handleLogIn = () => {
        navigate('/login');
    };

    const addToCart = async (productId) => {
        try {
            await axios.post('/cart_items', { product_id: productId });
            console.log(`Product with ID ${productId} added to cart.`);
            // Show toast notification
            setShowToast(true);
            // Update cart item count after adding to cart
            if (isLoggedIn) {
                const response = await axios.get('/cart');
                setCartItemCount(response.data.cart_items.length || 0);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container fluid style={{ padding: '2px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <img src={logo} alt="Company Logo" style={{ maxWidth: '80px', height: 'auto', borderRadius: "50%" }} />
                {isLoggedIn && <Link to="/cart" style={{ marginLeft: '20px', color: 'white', position: 'relative' }}>
                    <FaShoppingCart size={30} />
                    {cartItemCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-10px',
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '0.75rem',
                        }}>
                            {cartItemCount}
                        </span>
                    )}
                </Link>}

                <Form inline onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 20px', background: "none" }}>
                    <Form.Group style={{ width: '300px', display: 'flex' }}>
                        <Form.Control
                            type="text"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ marginRight: '5px' }}
                        />
                        <Button type="submit" variant="light" style={{ border: 'none', display: 'flex', alignItems: 'center' }}>
                            <FaSearch />
                        </Button>
                    </Form.Group>
                </Form>

                {!isLoggedIn && (
                    <Button variant="primary" onClick={handleLogIn} style={{ height: '40px' }}>
                        Login
                    </Button>
                )}
            </div>

            {filteredWholesalers.length > 0 ? (
                <Row className="justify-content-center">
                    {filteredWholesalers.map((wholesaler) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={wholesaler.id} className="mb-4">
                            <Card className="text-center position-relative" style={{ backgroundColor: 'white', color: '#333', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
                                <Link to={`/wholesaler/${wholesaler.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Header style={{ backgroundColor: '', borderRadius: '15px 15px 0 0', color: 'black' }}>
                                        <img src={wholesaler.profile_picture} alt={`${wholesaler.name} Logo`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                                        <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{wholesaler.name}</h5>
                                    </Card.Header>
                                </Link>
                                <Card.Body>
                                    <p style={{ color: '#555', fontStyle: 'italic', marginBottom: "5px" }}>{wholesaler.profile_description || "No description available"}</p>
                                    <BootstrapCarousel indicators={false} interval={7000} style={{ position: 'relative' }}>
                                        {wholesaler.products.map((product, index) => (
                                            <BootstrapCarousel.Item key={index}>
                                                {product.product_images && product.product_images.length > 0 ? (
                                                    <Image
                                                        cloudName="djmvocl1y"
                                                        publicId={product.product_images[0].image}
                                                        alt={`Image of ${product.name}`}
                                                        loading="lazy"
                                                        style={{ objectFit: 'contain', height: '200px', width: '100%' }}
                                                    />
                                                ) : (
                                                    <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
                                                        <span>No Image Available</span>
                                                    </div>
                                                )}
                                                <Card.Body>
                                                    <Card.Title style={{ fontSize: '1.2rem' }}>Product: {product.name}</Card.Title>
                                                    <Card.Text style={{ color: '#666' }}>Product Description: {product.description}</Card.Text>
                                                    <Card.Text>Price: Ksh {product.price}</Card.Text>
                                                    {isLoggedIn && (
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                right: '10px',
                                                                zIndex: 10, // Higher than carousel content
                                                            }}
                                                        >
                                                            <Button
                                                                variant="success"
                                                                onClick={() => addToCart(product.id)}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    color: 'white',
                                                                }}
                                                            >
                                                                <FaShoppingCart />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </BootstrapCarousel.Item>
                                        ))}
                                    </BootstrapCarousel>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h4>No wholesalers found.</h4>
                </div>
            )}

            {/* Toast Notification for Cart */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1050,
                }}
            >
                <Toast.Body>Product added to cart!</Toast.Body>
            </Toast>
        </Container>
    );
};

export default HomePage;
