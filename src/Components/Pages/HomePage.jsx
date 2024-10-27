import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Carousel as BootstrapCarousel, Card, Button, Form } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import logo from '../../Assets/Images/halal_logo.jpeg';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';

const HomePage = ({ isLoggedIn }) => {
    const [wholeSalers, setWholesalers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWholesalers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/profiles');
                const filteredWholesalers = response.data.filter(user => user.role === 'wholesaler');
                setWholesalers(filteredWholesalers);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchWholesalers();
    }, []);

    const handleLogIn = () => {
        navigate('/login');
    };

    const addToCart = (productId) => {
        console.log(`Product with ID ${productId} added to cart.`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <Container fluid style={{ padding: '2px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <img src={logo} alt="Company Logo" style={{ maxWidth: '80px', height: 'auto', borderRadius: "50%" }} />

                <Form inline onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
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

            {wholeSalers.length > 0 && (
                <Row className="justify-content-center">
                    {wholeSalers.map((wholesaler) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={wholesaler.id} className="mb-4">
                        <Card
                            className="text-center position-relative"
                            style={{
                                backgroundColor: 'white',
                                color: '#333',
                                borderRadius: '15px',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <Card.Header style={{ backgroundColor: '', borderRadius: '15px 15px 0 0', color: 'black' }}>
                                <img src={wholesaler.profile_picture} alt={`${wholesaler.name} Logo`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                                <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{wholesaler.name}</h5>
                            </Card.Header>
                            <Card.Body>
                                <p style={{ color: '#555', fontStyle: 'italic', marginBottom:"5px" }}>{wholesaler.profile_description || "No description available"}</p>
                                <BootstrapCarousel>
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
                                                <Card.Text style={{ color: '#666' }}>{product.description}</Card.Text>
                                                <Card.Text >Price: Ksh {product.price}</Card.Text>
                                            </Card.Body>
                                            {isLoggedIn && (
                                                <Button
                                                    variant="success"
                                                    onClick={() => addToCart(product.id)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        color: 'white',
                                                    }}
                                                >
                                                    <FaShoppingCart />
                                                </Button>
                                            )}
                                        </BootstrapCarousel.Item>
                                    ))}
                                </BootstrapCarousel>
                            </Card.Body>
                        </Card>
                    </Col>

                    ))}
                </Row>
            )}
        </Container>
    );
};

export default HomePage;
