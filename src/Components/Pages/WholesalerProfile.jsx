import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utilis/axiosConfig';
import { Container, Card, Row, Col, Carousel as BootstrapCarousel } from 'react-bootstrap';

const WholesalerProfilePage = () => {
    const { id } = useParams();
    const [wholesaler, setWholesaler] = useState(null);

    useEffect(() => {
        const fetchWholesaler = async () => {
            try {
                const response = await axios.get(`/profiles/${id}`);
                console.log(response.data);
                setWholesaler(response.data);
            } catch (error) {
                console.error('Error fetching wholesaler profile:', error);
            }
        };

        fetchWholesaler();
    }, [id]);

    useEffect(() => {
        if (wholesaler) {
            document.title = `${wholesaler.name} - Profile`;
        }
    }, [wholesaler]);

    return wholesaler ? (
        <Container>
            <Card>
                <Card.Header>
                    <h3>{wholesaler.name}</h3>
                    <p>{wholesaler.profile_description}</p>
                </Card.Header>
                <Card.Body>
                    <h5>Products</h5>
                    <Row>
                        {wholesaler.products && wholesaler.products.length > 0 ? (
                            wholesaler.products.map((product) => (
                                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                    <Card style={{
                                        maxWidth: '300px',
                                        maxHeight: '400px',
                                        margin: '0 auto',
                                        overflow: 'hidden'
                                    }}>
                                        <Card.Body>
                                            <BootstrapCarousel interval={null}>
                                                {product.product_images && product.product_images.length > 0 ? (
                                                    product.product_images.map((image, index) => (
                                                        <BootstrapCarousel.Item key={index}>
                                                            <img
                                                                src={image.image}
                                                                alt={product.name}
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    height: '200px',
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </BootstrapCarousel.Item>
                                                    ))
                                                ) : (
                                                    <div style={{
                                                        height: '200px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: 'lightgray',
                                                    }}>
                                                        <span>No Image Available</span>
                                                    </div>
                                                )}
                                            </BootstrapCarousel>
                                            <Card.Title className="mt-3">{product.name}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                            <Card.Text>Price: Ksh {product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    ) : (
        <p>Loading...</p>
    );
};

export default WholesalerProfilePage;
