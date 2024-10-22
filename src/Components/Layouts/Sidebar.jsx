import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Nav, Button, Modal, Spinner } from "react-bootstrap";
import { FaBars, FaTimes, FaHome, FaChartPie } from "react-icons/fa";
import logo from "../../Assets/Images/halal.jpeg";
import styles from '../../Styles/sidebar.module.css'; // importing the CSS module

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

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

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            localStorage.removeItem('token');
            // Simulate a delay for logout
            setTimeout(() => {
                setIsLoading(false);
                handleClose(); // Close the modal after logout
                window.location.reload(); // Reload the page to reflect logout
            }, 1000);  // Reload after 1 second
        } catch (error) {
            setIsLoading(false);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <>
            <Button
                onClick={toggleSidebar}
                className="sidebar-toggle-btn"
                style={{ margin: '20px', backgroundColor: '#c7a034', border: 'none' }}
            >
                {isOpen ? <FaTimes style={{ color: 'white' }} /> : <FaBars style={{ color: 'white' }} />}
            </Button>

            <Offcanvas
                show={isOpen}
                onHide={toggleSidebar}
                style={{
                    backgroundColor: '#343a40',
                    color: 'white',
                    width: '250px',
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Company Logo" style={{ marginRight: '10px', height: '50px', borderRadius: "50%" }} />
                        <span className={styles.halal}>HALAL</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" className={styles.navlink}>
                            <FaHome className={styles.icon} /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className={styles.navlink}>
                            <FaChartPie className={styles.icon} /> Dashboard
                        </Nav.Link>
                        <Button
                            onClick={handleShow}
                            className={`${styles.logoutBtn} mt-auto`}
                            style={{ backgroundColor: '#c7a034', border: 'none' }}
                        >
                            Logout
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Modal for Logout Confirmation */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Logout'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Sidebar;
