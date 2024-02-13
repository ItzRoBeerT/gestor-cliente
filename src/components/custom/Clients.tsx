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
            <div className="bg-red-950">
                <h1>Clients</h1>
            </div>
            <ul className="text-blue-400 bg-white overflow-auto">
                {clients.map((client: Client) => (
                    <li
                        className="cursor-pointer"
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
