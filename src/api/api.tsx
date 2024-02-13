import { API_URL } from "../config/config";

export const getClients = async () => {
    const response = await fetch(`${API_URL}/client/all`);
    const data = await response.json();
    return data;
};

export const addClient = async (client: {name: string}) => {
    const response = await fetch(`${API_URL}/client/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
    });
    const data = await response.json();
    return data;
};

export const getClientBills = async (clientId: number) => {
    const response = await fetch(`${API_URL}/bill/all/${clientId}`);
    const data = await response.json();
    return data;
}
