import React from "react";
import { useClientStore } from "../../store/clientStore";
import { getClients } from "../../api/api";

function ClientSearch() {
    const clients = useClientStore((state) => state.clients);
    const setClients = useClientStore((state) => state.setClients);
    let timeoutId: NodeJS.Timeout;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (e.target.value === "") {
                const fetchClients = async () => {
                    const clients = await getClients();
                    setClients(clients);
                };
                fetchClients();
            } else {
                const clientsFiltered = clients.filter((client) =>
                    client.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setClients(clientsFiltered);
            }
        }, 500);
    };

    return (
        <input
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Buscar cliente"
            onChange={handleSearch}
        />
    );
}

export default ClientSearch;
