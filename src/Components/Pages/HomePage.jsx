import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Carousel as BootstrapCarousel, Card, Button } from 'react-bootstrap';
import logo from '../../Assets/Images/halal_logo.jpeg';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';

const HomePage = ({ isLoggedIn }) => {
    const [products, setProducts] = useState([]);

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

    return (
        <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <img src={logo} alt="Company Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                {!isLoggedIn && (
                    <Button variant="primary" style={{ height: '40px', alignSelf: 'center' }}>Login</Button>
                )}
            </div>

            {products.length > 0 && (
                <Row className="justify-content-center">
                    {products.map((product) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
                            <Card
                                className="text-center"
                                style={{
                                    background: '#2c2c2c', // Darker background for card
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
                                                    style={{ objectFit: 'contain', height: '300px', width: '100%' }}
                                                />
                                            </BootstrapCarousel.Item>
                                        ))}
                                    </BootstrapCarousel>
                                ) : (
                                    <Card.Img
                                        variant="top"
                                        src="https://via.placeholder.com/300"
                                        alt={`Image of ${product.name}`}
                                        style={{ objectFit: 'contain', height: '300px', borderRadius: '15px 15px 0 0' }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                    <Card.Footer style={{ backgroundColor: 'black', color: 'white' }}>
                                        <small>{`Price: Ksh ${product.price}`}</small>
                                    </Card.Footer>
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
