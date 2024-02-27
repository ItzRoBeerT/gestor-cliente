import { useState } from "react";
import { addClient, getClients } from "../../api/api";
import { useClientStore } from "../../store/clientStore";

type ModalProps = {
    open: boolean;
    close: () => void;
};

function Modal(params: ModalProps) {
    const { open, close } = params;
    const [name, setName] = useState("");
    const setClients = useClientStore((state) => state.setClients);
    const addNewClient = async () => {
        const client = {
            name: name,
        };

        await addClient(client);
        setName("");

        const clients = await getClients();
        setClients(clients);
        close();
    };

    return (
        <div
            className={
                open
                    ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    : "hidden"
            }
        >
            <div className="bg-white p-8 rounded-md text-black">
                <h1 className="text-2xl font-bold text-center">Añadir Cliente</h1>
                <div className="flex flex-col gap-4 mt-4 w-full">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    <button
                        onClick={addNewClient}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    >
                        Añadir
                    </button>
                </div>
                <button
                    onClick={close}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer w-full"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default Modal;
