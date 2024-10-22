import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaBars, FaTimes, FaHome, FaChartPie } from "react-icons/fa";
import logo from "../../Assets/Images/halal.jpeg";
import styles from '../../Styles/sidebar.module.css'; // importing the CSS module

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/');
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
                            onClick={handleLogout}
                            className={`${styles.logoutBtn} mt-auto`}
                            style={{ backgroundColor: '#c7a034', border: 'none' }}
                        >
                            Logout
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;
