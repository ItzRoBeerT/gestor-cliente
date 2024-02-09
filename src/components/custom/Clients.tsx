import { useEffect, useState } from "react";
import { getClients } from "../../api/api";
function Clients() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getClients();
            setClients(clients);
        };
        fetchClients();
    }, []);

    console.log(clients);
    

    return (
        <div>
            <h1>Clients</h1>
            <ul>
                {clients.map((client: any) => (
                    <li key={client.id}>{client.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
