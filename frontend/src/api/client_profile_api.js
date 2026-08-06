import { API } from "./api";

const CLIENT_PROFILE_PATH = "/client/profile";

export const updateClientById = async (
    id,
    name,
    phone,
    age,
    gender,
    bloodGroup,
    address,
    emergencyContact
) => {

    const params = new URLSearchParams();

    if (name) params.append("name", name);

    if (phone) params.append("phone", phone);

    if (age) params.append("age", age);

    if (gender) params.append("gender", gender);

    if (bloodGroup) params.append("bloodGroup", bloodGroup);

    if (address) params.append("address", address);

    if (emergencyContact)
        params.append("emergencyContact", emergencyContact);

    const response = await API.patch(
        `${CLIENT_PROFILE_PATH}/update/${id}`,
        params
    );

    return response.data;

};