import React, { useState } from "react";
import axios from '../utilis/axiosConfig';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product[name]", product.name);
        formData.append("product[description]", product.description);
        formData.append("product[price]", product.price);
        formData.append("product[stock]", product.stock);

        product.images.forEach((image, index) => {
            formData.append(`product[product_images_attributes][${index}][image]`, image);
        });

        try {
            await axios.post('http://localhost:3000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Product added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <Container style={{ marginTop: '20px', background: 'linear-gradient(180deg, black, gold)', padding: '20px', borderRadius: '8px', color: 'white' }}>
            <h2 style={{color:"white"}}>Add Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formProductStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formProductImages">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                    Add Product
                </Button>
            </Form>
        </Container>
    );
}
