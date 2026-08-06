import React from "react";
import NotLoggedIn from "../../components/NotLoggedIn";
import { updateClientById } from "../../api/client_profile_api";
import { Button, Col, Form, Row } from "react-bootstrap";

const ViewClient = () => {

    const client = JSON.parse(localStorage.getItem("client"));

    return client == null
        ? <NotLoggedIn />
        : <Protected />;

};

const Protected = () => {

    const client = JSON.parse(localStorage.getItem("client"));

    const [name, setName] = React.useState(client.name || "");

    const [phone, setPhone] = React.useState(client.phone || "");

    const [age, setAge] = React.useState(client.age || "");

    const [gender, setGender] = React.useState(client.gender || "");

    const [bloodGroup, setBloodGroup] = React.useState(client.bloodGroup || "");

    const [address, setAddress] = React.useState(client.address || "");

    const [emergencyContact, setEmergencyContact] = React.useState(
        client.emergencyContact || ""
    );

    const updateClientCall = async () => {

    try {

        const updatedClient = await updateClientById(

            client.id,
            name,
            phone,
            age,
            gender,
            bloodGroup,
            address,
            emergencyContact

        );

        localStorage.setItem(
            "client",
            JSON.stringify(updatedClient)
        );

        alert("Profile Updated Successfully");

        window.location.reload();

    }
    catch (error) {

        console.log(error);

        alert("Unable to Update Profile");

    }

};

    const handleSubmit = (e) => {

        e.preventDefault();

        updateClientCall();

    };
        return (

        <Form onSubmit={handleSubmit}>

            <h2>My Profile</h2>

            <br />

            <Row className="mb-3">

                <Col>

                    <Form.Label>Name</Form.Label>

                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </Col>

                <Col>

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        value={client.email}
                        disabled
                    />

                </Col>

            </Row>

            <Row className="mb-3">

                <Col>

                    <Form.Label>Phone Number</Form.Label>

                    <Form.Control
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                </Col>

                <Col>

                    <Form.Label>Age</Form.Label>

                    <Form.Control
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                </Col>

            </Row>

            <Row className="mb-3">

                <Col>

                    <Form.Label>Gender</Form.Label>

                    <Form.Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >

                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                    </Form.Select>

                </Col>

                <Col>

                    <Form.Label>Blood Group</Form.Label>

                    <Form.Select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    >

                        <option value="">Select</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>

                    </Form.Select>

                </Col>

            </Row>

            <Row className="mb-3">

                <Col>

                    <Form.Label>Address</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                </Col>

            </Row>

            <Row className="mb-3">

                <Col>

                    <Form.Label>Emergency Contact</Form.Label>

                    <Form.Control
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                    />

                </Col>

            </Row>

            <Button type="submit">

                Update Profile

            </Button>

        </Form>

    );

};

export default ViewClient;