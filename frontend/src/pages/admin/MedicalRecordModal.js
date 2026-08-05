import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const MedicalRecordModal = ({ show, onClose, onSave }) => {

    const [record, setRecord] = useState({
        diagnosis: "",
        prescription: "",
        medicines: "",
        doctorNotes: ""
    });

    const handleChange = (e) => {

        setRecord({
            ...record,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = () => {

        onSave(record);

        setRecord({
            diagnosis: "",
            prescription: "",
            medicines: "",
            doctorNotes: ""
        });

    };

    return (

        <Modal show={show} onHide={onClose}>

            <Modal.Header closeButton>

                <Modal.Title>

                    Medical Record

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form.Control
                    className="mb-2"
                    name="diagnosis"
                    placeholder="Diagnosis"
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    name="prescription"
                    placeholder="Prescription"
                    onChange={handleChange}
                />

                <Form.Control
                    className="mb-2"
                    name="medicines"
                    placeholder="Medicines"
                    onChange={handleChange}
                />

                <Form.Control
                    as="textarea"
                    rows={4}
                    name="doctorNotes"
                    placeholder="Doctor Notes"
                    onChange={handleChange}
                />

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="success"
                    onClick={handleSave}
                >
                    Save Medical Record
                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default MedicalRecordModal;