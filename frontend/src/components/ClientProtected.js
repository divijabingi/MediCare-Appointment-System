import { Navigate } from "react-router-dom";

const ClientProtected = ({ children }) => {

    const client = localStorage.getItem("client");

    if (!client) {
        return <Navigate to="/login" />;
    }

    return children;

};

export default ClientProtected;