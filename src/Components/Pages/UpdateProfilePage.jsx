import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "../utilis/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile({ userId }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    profile_picture: null,
    profile_description: "",
    mobile_number: "",
    address: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/profiles/${userId}`);
        if (response.data) {
          setUserDetails(response.data);
        } else {

          navigate('/update-profile');
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profile_picture") {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: e.target.files[0]
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();


    for (const key in userDetails) {
      formData.append(`user[${key}]`, userDetails[key]);
    }

    try {
      await axios.put(`http://localhost:3000/profiles/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <Container className="p-4">
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label style={{ border: "none" }}>Business Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProfilePicture">
          <Form.Label style={{ border: "none" }}>Business Logo</Form.Label>
          <Form.Control
            type="file" // Changed to file input
            name="profile_picture"
            onChange={handleChange}
            accept="image/*" // Restrict file type to images
          />
        </Form.Group>

        <Form.Group controlId="formProfileDescription">
          <Form.Label style={{ border: "none" }}>Business Description</Form.Label>
          <Form.Control
            as="textarea"
            name="profile_description"
            value={userDetails.profile_description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formMobileNumber">
          <Form.Label style={{ border: "none" }}>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobile_number"
            value={userDetails.mobile_number}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label style={{ border: "none" }}>Business Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
}
