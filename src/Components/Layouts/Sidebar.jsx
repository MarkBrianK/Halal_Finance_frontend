import React, { useState, useEffect } from "react";
import { Offcanvas, Nav, Modal, Spinner } from "react-bootstrap";
import { FaBars, FaTimes, FaSignOutAlt, FaHome, FaTachometerAlt, FaUsers, FaClipboardList, FaPlus } from "react-icons/fa"; // Changed icon import
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/Images/halal_logo.jpeg"; // Ensure the path is correct
import styles from '../../Styles/sidebar.module.css'; // Ensure the path is correct

function Sidebar({ navLinks = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [userRole, setUserRole] = useState('');

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

        if (location.pathname !== '/login') {
            setIsOpen(true);
        }

        // Get user role from localStorage
        const role = localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location.pathname]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            localStorage.removeItem('token');
            localStorage.removeItem("role");
            setTimeout(() => {
                setIsLoading(false);
                handleClose();
                navigate('/');
                window.location.reload()
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            alert('Failed to log out. Please try again.'); // Handle logout error
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        toggleSidebar(); // Close sidebar on navigation
    };

    // Define the role-based dashboard link
    const dashboardLink = () => {
        if (userRole === 'admin') {
            return { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> }; // Changed icon
        } else if (userRole === 'borrower') {
            return { name: 'Dashboard', path: '/borrower-dashboard', icon: <FaUsers /> };
        } else if (userRole === 'investor') {
            return { name: 'Dashboard', path: '/investor-dashboard', icon: <FaUsers /> }; // Adjusted for consistency
        }
        return null;
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className={styles.sidebarToggleBtn}
                style={{ margin: '20px', backgroundColor: '#c7a034', border: 'none' }} // Updated color to match your theme
            >
                {isOpen ? <FaTimes style={{ color: 'white', fontSize: '1.5rem' }} /> : <FaBars style={{ color: 'white' }} />}
            </button>

            <Offcanvas
                show={isOpen}
                onHide={toggleSidebar}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    background: 'linear-gradient(180deg, black 0%, rgb(127, 110, 11) 100%)', // Gradient background
                    color: 'white',
                    width: '250px',
                }}
            >
                <Offcanvas.Header style={{ justifyContent: 'space-between' }}>
                    <Offcanvas.Title style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Company Logo" style={{ marginRight: '10px', height: '50px', borderRadius: "50%" }} />
                        <span className={styles.halal}>Halal Finance</span>
                    </Offcanvas.Title>
                    <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem' }}>
                        <FaTimes />
                    </button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {/* Conditional Dashboard Link based on userRole */}
                        {userRole && (
                            <Nav.Link
                                onClick={() => handleNavigation(dashboardLink()?.path)}
                                className={styles.navlink}
                            >
                                {dashboardLink()?.icon} {dashboardLink()?.name}
                            </Nav.Link>
                        )}

                        {/* Static Links */}
                        <Nav.Link onClick={() => handleNavigation('/')} className={styles.navlink}>
                            <FaHome /> Home
                        </Nav.Link>

                        {/* Role-specific or General Links */}
                        <Nav.Link onClick={() => handleNavigation('/pitches')} className={styles.navlink}>
                            <FaClipboardList /> Pitch List
                        </Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/add-pitch')} className={styles.navlink}>
                            <FaPlus /> Add Pitch
                        </Nav.Link>

                        {/* Logout Button */}
                        <Nav.Link onClick={handleShow} className={`${styles.logoutBtn} mt-auto`} style={{ backgroundColor: '#c7a034', border: 'none' }}>
                            <FaSignOutAlt /> Logout
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Logout Confirmation Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button variant="danger" onClick={handleLogout}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Logout'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Sidebar;
