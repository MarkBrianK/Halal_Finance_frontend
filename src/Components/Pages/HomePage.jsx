import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Carousel as BootstrapCarousel, Card, Button, Form, Toast } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from '../utilis/axiosConfig';
import { Image } from 'cloudinary-react';
import { useCart } from '../Pages/CartContext';

const HomePage = ({ isLoggedIn }) => {
  const { addToCart } = useCart();
  const [wholesalers, setWholesalers] = useState([]);
  const [filteredWholesalers, setFilteredWholesalers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => e.preventDefault();

  return (
    <Container fluid style={{ padding: '2px 0' }}>
      <Form inline onSubmit={handleSearchSubmit} style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        <Form.Group style={{ width: '300px', display: 'flex' }}>
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginRight: '5px' }}
          />
          <Button type="submit" variant="light" style={{ border: 'none' }}>
            Search
          </Button>
        </Form.Group>
      </Form>

      {filteredWholesalers.length > 0 ? (
        <Row className="justify-content-center">
          {filteredWholesalers.map((wholesaler) => (
            <Col xs={12} sm={6} md={4} lg={3} key={wholesaler.id} className="mb-4">
              <Card className="text-center position-relative" style={{ backgroundColor: 'white', color: '#333', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
                <Link to={`/wholesaler/${wholesaler.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Header style={{ color: 'black' }}>
                    <img src={wholesaler.profile_picture} alt={`${wholesaler.name} Logo`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                    <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{wholesaler.name}</h5>
                  </Card.Header>
                </Link>
                <Card.Body>
                  <p style={{ color: '#555', fontStyle: 'italic', marginBottom: "5px" }}>{wholesaler.profile_description || "No description available"}</p>
                  <BootstrapCarousel indicators={false} interval={7000} style={{ position: 'relative' }}>
                    {wholesaler.products.map((product, index) => (
                      <BootstrapCarousel.Item key={index}>
                        <Image
                          cloudName="djmvocl1y"
                          publicId={product.product_images[0]?.image}
                          alt={`Image of ${product.name}`}
                          loading="lazy"
                          style={{ objectFit: 'contain', maxWidth: '100%', height: '200px', marginBottom: '15px', borderRadius: '15px' }}
                        />
                        <Card.Text style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>{product.name}</Card.Text>
                        <Card.Text style={{ color: '#333' }}>Ksh {product.price}</Card.Text>
                        {isLoggedIn && (
                          <Button variant="outline-primary" size="sm" onClick={() => {
                            addToCart(product);
                            setShowToast(true); // Show toast when item is added to cart
                          }}>
                            <FaShoppingCart style={{ marginRight: '5px' }} /> Add to Cart
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
      ) : (
        <Row className="justify-content-center">
          <Col xs="auto">No products found.</Col>
        </Row>
      )}

      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        <Toast.Body>Item added to cart successfully!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default HomePage;
