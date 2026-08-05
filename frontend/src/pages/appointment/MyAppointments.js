import React from "react";
import NotLoggedIn from "../../components/NotLoggedIn";

import { Table, Button, Modal } from "react-bootstrap";

import { getAppointments } from "../../api/appointment_api";

import {
    getMedicalRecordByAppointment
} from "../../api/medicalRecordApi";

const MyAppointments = () => {

    const client = JSON.parse(localStorage.getItem("client"));

    return client == null
        ? <NotLoggedIn />
        : <Protected client={client} />;

};

class Protected extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            data: [],

            show: false,

            medicalRecord: null

        };

    }

    componentDidMount() {

        this.loadAppointments();

    }

    loadAppointments = async () => {

        const list = await getAppointments();

        this.setState({

            data: list.filter(

                item => item.clientId === this.props.client.id

            )

        });

    };

    handleViewMedicalRecord = async (appointmentId) => {

        try {

            const record = await getMedicalRecordByAppointment(
                appointmentId
            );

            this.setState({

                medicalRecord: record,

                show: true

            });

        }

        catch {

            alert("Medical Record Not Found");

        }

    };

    handleClose = () => {

        this.setState({

            show: false,

            medicalRecord: null

        });

    };
    render() {

    const { data, medicalRecord } = this.state;

    if (data == null)
        return <div>Loading...</div>;

    return (

        <div>

            <h2>My Appointments</h2>

            <br />

            <Table striped bordered hover>

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Date & Time</th>

                    <th>Doctor</th>

                    <th>Status</th>

                    <th>Notes</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {

                    data.map((item) => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            <td>
                                {new Date(item.schedule).toLocaleString()}
                            </td>

                            <td>
                                {item.doctor ? item.doctor.name : "-"}
                            </td>

                            <td>
                                {
                                    item.occurred
                                        ? "Completed"
                                        : "Pending"
                                }
                            </td>

                            <td>{item.notes}</td>

                            <td>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    disabled={!item.occurred}
                                    onClick={() =>
                                        this.handleViewMedicalRecord(item.id)
                                    }
                                >

                                    View Medical Record

                                </Button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </Table>
                        <Modal
                show={this.state.show}
                onHide={this.handleClose}
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        Medical Record

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {

                        medicalRecord == null

                        ?

                        <p>No Medical Record Found.</p>

                        :

                        <>

                            <p>

                                <strong>Diagnosis:</strong><br/>

                                {medicalRecord.diagnosis}

                            </p>

                            <p>

                                <strong>Prescription:</strong><br/>

                                {medicalRecord.prescription}

                            </p>

                            <p>

                                <strong>Medicines:</strong><br/>

                                {medicalRecord.medicines}

                            </p>

                            <p>

                                <strong>Doctor Notes:</strong><br/>

                                {medicalRecord.doctorNotes}

                            </p>

                            <p>

                                <strong>Date:</strong><br/>

                                {medicalRecord.createdDate}

                            </p>

                        </>

                    }

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={this.handleClose}
                    >

                        Close

                    </Button>

                </Modal.Footer>

            </Modal>

        </div>

    );

}

}

export default MyAppointments;