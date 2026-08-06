import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/admin_api";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        const response = await adminLogin(username, password);

       if (response.success) {

    localStorage.setItem("admin", "true");
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);

    alert("Admin Login Successful");

    navigate("/admin/doctors");

}else {

            alert(response.message);

        }

    };

    return (

        <Card style={{ padding: 30 }}>

            <h2>Admin Login</h2>

            <br/>

            <Form onSubmit={handleLogin}>

                <Form.Group className="mb-3">

                    <Form.Label>Username</Form.Label>

                    <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </Form.Group>

                <Button type="submit">

                    Login

                </Button>

            </Form>

        </Card>

    );

};

export default AdminLogin;