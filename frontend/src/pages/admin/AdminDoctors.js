import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
} from "../../api/doctor_api";

const AdminDoctors = () => {

    const admin = localStorage.getItem("admin");

    const emptyDoctor = {
    name: "",
    email: "",
    password: "",
    qualification: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    availability: ""
};

    const [doctor, setDoctor] = useState(emptyDoctor);
    const [doctors, setDoctors] = useState([]);
    const [editing, setEditing] = useState(false);
    const [doctorId, setDoctorId] = useState(null);

    const loadDoctors = async () => {
        const response = await getDoctors();
        setDoctors(response.data);
    };

    useEffect(() => {
        if (admin === "true") {
            loadDoctors();
        }
    }, []);

    if (admin !== "true") {
        return <Navigate to="/admin/login" replace />;
    }

    const handleChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            doctor.name.trim() === "" ||
            doctor.qualification.trim() === "" ||
            doctor.specialization.trim() === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {

            if (editing) {

                await updateDoctor(doctorId, doctor);
                alert("Doctor Updated Successfully");

            } else {

                await addDoctor(doctor);
                alert("Doctor Added Successfully");

            }

            setDoctor(emptyDoctor);
            setEditing(false);
            setDoctorId(null);

            loadDoctors();

        } catch (error) {

            console.log(error);
            alert("Something went wrong.");

        }

    };

    const handleEdit = (doc) => {

        setDoctor({
            name: doc.name,
            qualification: doc.qualification,
            specialization: doc.specialization,
            experience: doc.experience,
            consultationFee: doc.consultationFee,
            availability: doc.availability
        });

        setDoctorId(doc.id);
        setEditing(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDoctor(id);

            alert("Doctor Deleted Successfully");

            loadDoctors();

        } catch (error) {

            console.log(error);
            alert("Unable to delete doctor.");

        }

    };

    return (

        <Card style={{ padding: 25 }}>

            <h2>Admin Dashboard</h2>

            <hr />

            <h4>Doctor Management</h4>

            <br />

            <Form onSubmit={handleSubmit}>

                <Form.Control
                    className="mb-2"
                    placeholder="Doctor Name"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    placeholder="Qualification"
                    name="qualification"
                    value={doctor.qualification}
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    placeholder="Specialization"
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    placeholder="Experience"
                    name="experience"
                    type="number"
                    value={doctor.experience}
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    placeholder="Consultation Fee"
                    name="consultationFee"
                    type="number"
                    value={doctor.consultationFee}
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-3"
                    placeholder="Availability"
                    name="availability"
                    value={doctor.availability}
                    onChange={handleChange}
                />

                <Button type="submit">
                    {editing ? "Update Doctor" : "Add Doctor"}
                </Button>

            </Form>

            <br />

            <Table striped bordered hover>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Qualification</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Fee</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {doctors.map((doc) => (

                        <tr key={doc.id}>

                            <td>{doc.name}</td>
                            <td>{doc.qualification}</td>
                            <td>{doc.specialization}</td>
                            <td>{doc.experience}</td>
                            <td>{doc.consultationFee}</td>
                            <td>{doc.availability}</td>

                            <td>

                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => handleEdit(doc)}
                                >
                                    Edit
                                </Button>

                                {" "}

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(doc.id)}
                                >
                                    Delete
                                </Button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </Table>

        </Card>

    );

};

export default AdminDoctors;