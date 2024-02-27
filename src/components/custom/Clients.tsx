import { useEffect } from "react";
import { getClients, removeClient } from "../../api/api";
import { Client } from "../../models/types";
import { useClientStore } from "../../store/clientStore";
import ClientSearch from "../Form/ClientSearch";
import papelera from "../../assets/papelera.svg";
function Clients() {
    const clients = useClientStore((state) => state.clients);
    const setClients = useClientStore((state) => state.setClients);
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

    const handleRemoveClient = async (client: Client) => {
        console.log("Cliente eliminado:", client);
        const response = await removeClient(client._id);

        if(response){ 
            const updateClients = clients.filter(cli => cli._id !== client._id)
            setClients(updateClients)
        }
    };
    //#endregion

    return (
        <div className="text-center">
            <div className="bg-gray-800 py-4 flex flex-col px-6 gap-2">
                <h1 className="text-white text-2xl font-bold">Clientes</h1>
                <ClientSearch />
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
                        <div className="flex items-center justify-between">
                            {client.name}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveClient(client);
                                }}
                                className="hover:bg-red-300 rounded-full transition p-2"
                            >
                                <img src={papelera} className="h-4" alt="React logo" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
