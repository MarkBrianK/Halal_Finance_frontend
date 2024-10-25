import React, { useState, useEffect } from "react";
import { Offcanvas, Nav, Modal, Spinner } from "react-bootstrap";
import { FaBars, FaSignOutAlt, FaHome, FaTachometerAlt, FaUsers, FaClipboardList, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/Images/halal_logo.jpeg";
import styles from '../../Styles/sidebar.module.css';

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
                window.location.reload();
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

    const dashboardLink = () => {
        if (userRole === 'admin') {
            return { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> };
        } else if (userRole === 'borrower') {
            return { name: 'Dashboard', path: '/borrower-dashboard', icon: <FaUsers /> };
        } else if (userRole === 'investor') {
            return { name: 'Dashboard', path: '/investor-dashboard', icon: <FaUsers /> };
        }
        return null;
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className={styles.sidebarToggleBtn}
                style={{ margin: '20px', backgroundColor: '#c7a034', border: 'none' }}
            >
                <FaBars style={{ color: 'white' }} />
            </button>

            <Offcanvas
                show={isOpen}
                onHide={toggleSidebar}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                placement="end"
                style={{
                    background: 'linear-gradient(180deg, black 0%, rgb(127, 110, 11) 100%)',
                    color: 'white',
                    width: '250px',
                }}
            >
                <Offcanvas.Header style={{ justifyContent: 'space-between' }}>
                    <Offcanvas.Title style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Company Logo" style={{ marginRight: '10px', height: '50px', borderRadius: "50%" }} />
                        <span className={styles.halal}>Halal Finance</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => handleNavigation('/')} className={styles.navlink}>
                            <FaHome /> Home
                        </Nav.Link>
                        {userRole && (
                            <Nav.Link
                                onClick={() => handleNavigation(dashboardLink()?.path)}
                                className={styles.navlink}
                            >
                                {dashboardLink()?.icon} {dashboardLink()?.name}
                            </Nav.Link>
                        )}
                        <Nav.Link onClick={() => handleNavigation('/pitches')} className={styles.navlink}>
                            <FaClipboardList /> Pitch List
                        </Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/add-pitch')} className={styles.navlink}>
                            <FaPlus /> Add Pitch
                        </Nav.Link>
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
