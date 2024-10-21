import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaBuilding, FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsOpen(false); // Keep the sidebar closed on larger screens
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize(); // Ensure the sidebar is closed based on initial size

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
                        <FaBuilding style={{ marginRight: '10px' }} />
                        Halal
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup" style={{ color: 'white' }}>Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" style={{ color: 'white' }}>Dashboard</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;
