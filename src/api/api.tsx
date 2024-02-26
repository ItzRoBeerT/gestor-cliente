import { API_URL } from "../config/config";

export const getClients = async () => {
    const response = await fetch(`${API_URL}/client/all`);
    const data = await response.json();
    return data;
};

export const addClient = async (client: { name: string }) => {
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
};

export const addBill = async (bill: {
    client: string;
    invoice: string;
    date: string;
    base: number;
    iva: number;
    amount: number;
}) => {
    const response = await fetch(`${API_URL}/bill/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
    });
    const data = await response.json();
    return data;
};

export const updateBill = async (bill: {
    _id: number;
    invoice: string;
    date: string;
    base: number;
    iva: number;
    amount: number;
}) => {
    const objBill = {
        invoice: bill.invoice,
        date: bill.date,
        base: bill.base,
        iva: bill.iva,
        amount: bill.amount,
    };

    const response = await fetch(`${API_URL}/bill/update/${bill._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBill),
    });
    const data = await response.json();
    return data;
};

export const removeBill = async (billId: number) => {
    try {
        const response = await fetch(`${API_URL}/bill/remove/${billId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa (por ejemplo, un error 404 o 500), lanzamos un error con el mensaje del servidor
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        // Si la respuesta es exitosa, retornamos los datos
        const data = await response.json();
        return data;
    } catch (error) {
        // Si hay un error de red o algún otro error, lo manejamos aquí
        console.error("Error al eliminar la factura:", error);
        throw new Error("Hubo un error al intentar eliminar la factura");
    }
};
