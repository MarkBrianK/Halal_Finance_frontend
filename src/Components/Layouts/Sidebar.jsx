import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaChartPie } from "react-icons/fa";
import logo from "../../Assets/Images/halal.jpeg";
import styles from '../../Styles/sidebar.module.css'; // importing the CSS module

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Button
                onClick={toggleSidebar}
                style={{ margin: '20px', backgroundColor: '#343a40', border: 'none' }}
            >
                {isOpen ? <FaTimes style={{ color: 'white' }} /> : <FaBars style={{ color: 'white' }} />}
            </Button>

            <Offcanvas
                show={isOpen}
                onHide={toggleSidebar}
                style={{
                    backgroundColor: '#343a40',
                    color: 'white',
                    width: '200px',
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Company Logo" style={{ marginRight: '10px', height: '40px', borderRadius: "50%" }} />
                        <span className={styles.halal}>HALAL</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" style={{ color: 'white' }}>
                            <FaHome style={{ marginRight: '8px' }} /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>
                            <FaSignInAlt style={{ marginRight: '8px' }} /> Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup" style={{ color: 'white' }}>
                            <FaUserPlus style={{ marginRight: '8px' }} /> Sign Up
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" style={{ color: 'white' }}>
                            <FaChartPie style={{ marginRight: '8px' }} /> Dashboard
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;
