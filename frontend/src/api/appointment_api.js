import { API } from "./api";

export const getAppointments = async () => {
    const response = await API.get("/appointment/list");
    return response.data;
};

export const getAppointmentById = async (id) => {
    const response = await API.get(`/appointment/view/${id}`);
    return response.data;
};

export const checkAppointmentAvailability = async (schedule) => {
    const response = await API.get("/appointment/availability", {
        params: { schedule }
    });

    return response.data;
};

export const bookAppointment = async (
    schedule,
    clientId,
    doctorId
) => {

    const response = await API.post("/appointment/book", null, {
        params: {
            schedule,
            clientId,
            doctorId
        }
    });

    return response.data;
};

export const concludeAppointment = async (id, notes) => {
    const response = await API.patch(`/appointment/conclude/${id}`, null, {
        params: { notes }
    });

    return response.data;
};