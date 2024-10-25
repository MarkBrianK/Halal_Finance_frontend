import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Carousel as BootstrapCarousel, Card, Button, Form } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // Import the cart and search icons
import logo from '../../Assets/Images/halal_logo.jpeg';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';

const HomePage = ({ isLoggedIn }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
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
        e.preventDefault(); // Prevent the default form submission
        // You can add any search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <Container fluid style={{ backgroundColor: '', padding: '2px 0' }}>
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

            {products.length > 0 && (
                <Row className="justify-content-center">
                    {products
                        .filter((product) =>
                            product.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
                                <Card
                                    className="text-center position-relative"
                                    style={{
                                        background: 'linear-gradient(90deg, black 5%, gold 140%)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                                    }}
                                >
                                    {Array.isArray(product.product_images) && product.product_images.length > 0 ? (
                                        <BootstrapCarousel>
                                            {product.product_images.map((imgObj, index) => (
                                                <BootstrapCarousel.Item key={index}>
                                                    <Image
                                                        cloudName="djmvocl1y"
                                                        publicId={imgObj.image}
                                                        alt={`Image of ${product.name}`}
                                                        className="carousel-image"
                                                        loading="lazy"
                                                        style={{ objectFit: 'contain', height: '250px', width: '100%' }}
                                                    />
                                                </BootstrapCarousel.Item>
                                            ))}
                                        </BootstrapCarousel>
                                    ) : (
                                        <Card.Img
                                            variant="top"
                                            src="https://via.placeholder.com/300"
                                            alt={`Image of ${product.name}`}
                                            style={{ objectFit: 'contain', height: '250px', borderRadius: '15px 15px 0 0' }}
                                        />
                                    )}
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                            Product: {product.name}
                                        </Card.Title>
                                        <Card.Text style={{ minHeight: '60px', margin: '10px 0' }}>
                                            Description: {product.description}
                                        </Card.Text>
                                        <Card.Footer style={{ backgroundColor: 'black', color: 'white' }}>
                                            <small style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                                {`Price: Ksh ${product.price}`}
                                            </small>
                                        </Card.Footer>
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
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: '0',
                                                color: 'white',
                                            }}
                                        >
                                            <FaShoppingCart style={{ fontSize: '20px' }} />
                                        </Button>
                                    )}
                                </Card>
                            </Col>
                        ))}
                </Row>
            )}
        </Container>
    );
};

export default HomePage;
