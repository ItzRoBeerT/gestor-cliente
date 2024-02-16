import { useEffect, useState } from "react";
import { getClients } from "../../api/api";
import { Client } from "../../models/types";
import { useClientStore } from "../../store/clientStore";

function Clients() {
    const [clients, setClients] = useState([]);
    const setClient = useClientStore((state) => state.setClient);

    //#region FUNCTIONS
    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getClients();
            setClients(clients);
        };
        fetchClients();
    }, []);

    const handleClientClick = (client: Client) => {
        setClient(client);
    };
    //#endregion

    return (
        <div className="text-center">
            <div className="bg-gray-800 py-4 px-6">
                <h1 className="text-white text-2xl font-bold">Clientes</h1>
            </div>
            <ul className="text-blue-400 bg-white overflow-auto">
                {clients.map((client: Client) => (
                    <li
                        className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                        onClick={() => {
                            handleClientClick(client);
                        }}
                        key={client.name}
                    >
                        {client.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
