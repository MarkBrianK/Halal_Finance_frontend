import React, { useState, useEffect } from "react";
import { Offcanvas, Nav, Button, Modal, Spinner } from "react-bootstrap";
import { FaBars, FaTimes, FaChartPie, FaClipboardList, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/halal.jpeg";
import styles from '../../Styles/sidebar.module.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
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
            setTimeout(() => {
                setIsLoading(false);
                handleClose();
                navigate('/login'); // Navigate to the login page after logout
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            alert('Failed to log out. Please try again.');
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        toggleSidebar();
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                        <Nav.Link onClick={() => handleNavigation('/borrower-dashboard')} className={styles.navlink}>
                            <FaChartPie className={styles.icon} /> Dashboard
                        </Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/add-pitch')} className={styles.navlink}>
                            <FaPlusCircle className={styles.icon} /> Add Pitch
                        </Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/pitches')} className={styles.navlink}>
                            <FaClipboardList className={styles.icon} /> Pitch List
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
