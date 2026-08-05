import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import {
    getAppointments,
    concludeAppointment
} from "../../api/appointment_api";

import {
    addMedicalRecord,
    medicalRecordExists
} from "../../api/medicalRecordApi";

const AdminAppointments = () => {

    const admin = localStorage.getItem("admin");

    const [appointments, setAppointments] = useState([]);

    const [show, setShow] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [notes, setNotes] = useState("");

    const [diagnosis, setDiagnosis] = useState("");

    const [prescription, setPrescription] = useState("");

    const [medicines, setMedicines] = useState("");

    const [doctorNotes, setDoctorNotes] = useState("");

    const [recordExists, setRecordExists] = useState(false);

    useEffect(() => {

        if (admin === "true") {

            loadAppointments();

        }

    }, []);

    if (admin !== "true") {

        return <Navigate to="/admin/login" replace />;

    }

    const loadAppointments = async () => {

        const data = await getAppointments();
        console.log(data);
        setAppointments(data);

    };

    const openModal = async (appointment) => {

        setSelectedAppointment(appointment);

        setNotes(appointment.notes || "");

        setDiagnosis("");

        setPrescription("");

        setMedicines("");

        setDoctorNotes("");

        const exists = await medicalRecordExists(
            appointment.id
        );

        setRecordExists(exists);

        setShow(true);

    };

    const closeModal = () => {

        setShow(false);

        setSelectedAppointment(null);

        setNotes("");

        setDiagnosis("");

        setPrescription("");

        setMedicines("");

        setDoctorNotes("");

    };
    const handleSave = async () => {

    if (
        diagnosis.trim() === "" ||
        prescription.trim() === "" ||
        medicines.trim() === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    try {

        // 1. Conclude Appointment

        await concludeAppointment(
            selectedAppointment.id,
            notes
        );

        // 2. Save Medical Record

        await addMedicalRecord({

            appointmentId: selectedAppointment.id,

            clientId: selectedAppointment.clientId,

            doctorId: selectedAppointment.doctor.id,

            diagnosis: diagnosis,

            prescription: prescription,

            medicines: medicines,

            doctorNotes: doctorNotes,

            createdDate: new Date().toISOString().split("T")[0]

        });

        alert("Medical Record Saved Successfully");

        closeModal();

        loadAppointments();

    }
    catch (error) {

        console.log(error);

        alert("Unable to save medical record.");

    }

};
return (

    <Card style={{ padding: 25 }}>

        <h2>Admin Dashboard</h2>

        <hr />

        <h4>Appointment Management</h4>

        <br />

        <Table striped bordered hover>

            <thead>

            <tr>

                <th>ID</th>

                <th>Patient ID</th>

                <th>Doctor</th>

                <th>Date & Time</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

            </thead>

            <tbody>

            {

                appointments.map((item) => (

                    <tr key={item.id}>

                        <td>{item.id}</td>

                        <td>{item.clientId}</td>

                        <td>
                            {item.doctor ? item.doctor.name : "-"}
                        </td>

                        <td>
                            {new Date(item.schedule).toLocaleString()}
                        </td>

                        <td>

                            {
                                item.occurred
                                    ? "Completed"
                                    : "Pending"
                            }

                        </td>

                        <td>

                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => openModal(item)}
                                disabled={item.occurred}
                            >

                                Manage

                            </Button>

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </Table>

        <Modal
            show={show}
            onHide={closeModal}
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Appointment Management

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form.Group className="mb-3">

                    <Form.Label>Diagnosis</Form.Label>

                    <Form.Control
                        value={diagnosis}
                        onChange={(e)=>setDiagnosis(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Prescription</Form.Label>

                    <Form.Control
                        value={prescription}
                        onChange={(e)=>setPrescription(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Medicines</Form.Label>

                    <Form.Control
                        value={medicines}
                        onChange={(e)=>setMedicines(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Doctor Notes</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={doctorNotes}
                        onChange={(e)=>setDoctorNotes(e.target.value)}
                    />

                </Form.Group>

                <Form.Group>

                    <Form.Label>Appointment Notes</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={notes}
                        onChange={(e)=>setNotes(e.target.value)}
                    />

                </Form.Group>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={closeModal}
                >

                    Cancel

                </Button>

                <Button
                 variant="success"
                 onClick={handleSave}
                >
                 Save & Complete
                </Button>

            </Modal.Footer>

        </Modal>

    </Card>

);

};

export default AdminAppointments;