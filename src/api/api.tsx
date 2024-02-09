import { API_URL } from "../config/config";

export const getClients = async () => {
    const response = await fetch(`${API_URL}/client/all`);
    const data = await response.json();
    return data;
};
