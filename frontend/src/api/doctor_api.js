import { API } from "./api";

export const getDoctors = () => API.get("/doctor");

export const getDoctorById = (id) => API.get(`/doctor/${id}`);

export const addDoctor = (doctor) => API.post("/doctor", doctor);

export const updateDoctor = (id, doctor) =>
    API.put(`/doctor/${id}`, doctor);

export const deleteDoctor = (id) =>
    API.delete(`/doctor/${id}`);