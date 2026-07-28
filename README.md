# MediCare Appointment System

## Overview

MediCare Appointment System is a full-stack web application that allows patients to register, log in, manage their profile, book medical appointments, check appointment availability, and view appointment history.

The project follows a REST API architecture using React for the frontend and Spring Boot for the backend.

---

## Features

- User Registration
- User Login
- Profile Management
- Medical Record Update
- Appointment Availability Check
- Book Appointment
- View Bookings
- Conclude Appointment
- Appointment Notes

---

## Tech Stack

Frontend
- React.js
- JavaScript
- HTML
- CSS
- Axios

Backend
- Spring Boot
- Spring Data JPA
- Hibernate

Database
- MySQL

Build Tool
- Maven

---

## Project Structure

```
backend/
frontend/
```

---

## Database

The application uses MySQL as the relational database.

Hibernate automatically creates and updates the required tables.

Main Tables

- client
- appointment

---

## REST APIs

Authentication

- Register
- Login

Client

- View Profile
- Update Profile

Appointment

- Check Availability
- Book Appointment
- View Appointments
- Conclude Appointment

---

## How to Run

### Backend

1. Open backend in Eclipse
2. Configure MySQL in application.properties
3. Run BackendApplication.java

Backend runs on

```
http://localhost:8080
```

---

### Frontend

```
cd frontend
npm install
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

## Screenshots

(Add your screenshots here)

---

## Future Improvements

- Doctor Management
- Admin Dashboard
- Email Notifications
- Payment Integration
- Appointment Cancellation
- JWT Authentication
