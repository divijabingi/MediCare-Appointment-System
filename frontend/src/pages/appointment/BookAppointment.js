import React from 'react';
import NotLoggedIn from "../../components/NotLoggedIn";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Col, Form, Row, Stack } from "react-bootstrap";

import {
    bookAppointment,
    checkAppointmentAvailability
} from "../../api/appointment_api";

import { getDoctors } from "../../api/doctor_api";

const BookAppointment = () => {

    const client = JSON.parse(localStorage.getItem("client"));

    return client == null
        ? <NotLoggedIn />
        : <Protected client={client} />;

};

const Protected = ({ client }) => {

    const [appointmentDate, setAppointmentDate] = React.useState(new Date());

    const [doctors, setDoctors] = React.useState([]);

    const [doctorId, setDoctorId] = React.useState("");

    React.useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {

        const response = await getDoctors();

        setDoctors(response.data);

        if (response.data.length > 0) {
            setDoctorId(response.data[0].id);
        }

    };

    const checkAvailabilityCall = async () => {

        const formattedDate = appointmentDate.toISOString();

        const available = await checkAppointmentAvailability(formattedDate);

        alert(
            available
                ? "The timeslot is available."
                : "The timeslot is NOT available."
        );

    };

    const confirmBookingCall = async () => {

        try {

            const formattedDate = appointmentDate.toISOString();

            console.log("Doctor ID =", doctorId);

            const success = await bookAppointment(
                formattedDate,
                client.id,
                doctorId
            );

            alert(
                success
                    ? "Appointment successfully booked."
                    : "The timeslot is NOT available."
            );

        } catch (error) {

            console.log(error);

            alert("Booking Failed");

        }

    };

    return (

        <div>

            <h1>Book Appointment</h1>

            <br />

            <Form>

                <Row className="mb-3">

                    <Col sm={4}>
                        Select Doctor
                    </Col>

                    <Col sm={8}>

                        <Form.Select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                        >

                            {
                                doctors.map((doctor) => (

                                    <option
                                        key={doctor.id}
                                        value={doctor.id}
                                    >

                                        {doctor.name} - {doctor.specialization}

                                    </option>

                                ))
                            }

                        </Form.Select>

                    </Col>

                </Row>

                <Row>

                    <Col sm={4}>

                        Bookings are handled by the hour,
                        select one at your nearest convenience.

                    </Col>

                    <Col sm={8}>

                        <Stack direction="horizontal" gap={2}>

                            <DatePicker
                                selected={appointmentDate}
                                onChange={(date) => setAppointmentDate(date)}
                                showTimeSelect
                                timeIntervals={60}
                                dateFormat="Pp"
                            />

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={checkAvailabilityCall}
                            >

                                Check Availability

                            </Button>

                            <div className="vr" />

                            <Button
                                type="button"
                                variant="primary"
                                onClick={confirmBookingCall}
                            >

                                Confirm Booking

                            </Button>

                        </Stack>

                    </Col>

                </Row>

            </Form>

        </div>

    );

};

export default BookAppointment;