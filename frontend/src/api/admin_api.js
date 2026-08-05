import { API } from "./api";

export const adminLogin = async (username, password) => {

    const response = await API.post("/admin/login", null, {
        params: {
            username,
            password
        }
    });

    return response.data;
};