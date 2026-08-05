import { API } from "./api";

export const addMedicalRecord = async (record) => {

    const response = await API.post(
        "/medical-record/add",
        record
    );

    return response.data;

};

export const getMedicalRecordByAppointment = async (appointmentId) => {

    const response = await API.get(
        `/medical-record/appointment/${appointmentId}`
    );

    return response.data;

};

export const getMedicalRecordsByClient = async (clientId) => {

    const response = await API.get(
        `/medical-record/client/${clientId}`
    );

    return response.data;

};

export const updateMedicalRecord = async (id, record) => {

    const response = await API.put(
        `/medical-record/update/${id}`,
        record
    );

    return response.data;

};

export const medicalRecordExists = async (appointmentId) => {

    try {

        const response = await API.get(
            `/medical-record/appointment/${appointmentId}`
        );

        return response.data != null;

    } catch {

        return false;

    }

};
console.log("medical_record_api loaded");