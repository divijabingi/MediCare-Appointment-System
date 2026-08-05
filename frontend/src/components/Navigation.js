import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Navigation = () => {

    const client = JSON.parse(localStorage.getItem('client'));

    const loggedIn = client != null;

    const adminLoggedIn = localStorage.getItem("admin") === "true";

    const handleLogoutPress = () => {

        localStorage.setItem("client", null);

        window.location.reload();

    };

    const handleAdminLogout = () => {

        localStorage.removeItem("admin");

        window.location.href = "/";

    };

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

            <Container>

                <Navbar.Brand href="/">MediCare</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">

                        <Nav.Link href="/book_appointment">
                            Book Appointment
                        </Nav.Link>

                        <Nav.Link href="/my_appointments">
                            My Bookings
                        </Nav.Link>

                    </Nav>

                    {
                        adminLoggedIn ? (

                            <Nav>

                                <NavDropdown
                                    title="Admin"
                                    id="admin-dropdown"
                                >

                                    <NavDropdown.Item
                                        href="/admin/doctors"
                                    >
                                        Doctor Management
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        href="/admin/appointments"
                                    >
                                        Appointment Management
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider/>

                                    <NavDropdown.Item
                                        onClick={handleAdminLogout}
                                    >
                                        Admin Logout
                                    </NavDropdown.Item>

                                </NavDropdown>

                            </Nav>

                        ) : (

                            <Nav>

                                <Nav.Link href="/admin/login">
                                    Admin
                                </Nav.Link>

                            </Nav>

                        )
                    }

                    {
                        loggedIn ? (

                            <Nav>

                                <NavDropdown
                                    title={"Welcome " + client.name.split(" ")[0]}
                                    id="client-dropdown"
                                >

                                    <NavDropdown.Item
                                        href="/view_client"
                                    >
                                        View Profile
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider/>

                                    <NavDropdown.Item
                                        href="/"
                                        onClick={handleLogoutPress}
                                    >
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>

                            </Nav>

                        ) : (

                            <Nav>

                                <Nav.Link href="/login">
                                    Login
                                </Nav.Link>

                                <Nav.Link href="/register">
                                    Register
                                </Nav.Link>

                            </Nav>

                        )
                    }

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

}

export default Navigation;