import { useState } from "react";

type ModalProps = {
    open: boolean;
    close: () => void;
};

function InvoiceModal(props: ModalProps) {
    //#region VARIABLES
    const { open, close } = props;
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [base, setBase] = useState(0);
    const [iva, setIva] = useState(0);
    const [amount, setAmount] = useState(0);
    //#endregion
    //#region FUNCIONES
    const addNewInvoice = async () => {
        const invoice = {
            name: name,
        };

        // const response = await addInvoice(invoice);
        // console.log(response);

        close();
    };
    //#endregion

    return (
        <div
            className={
                open
                    ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    : "hidden"
            }
        >
            <form className="bg-white p-8 rounded-md">
                <h1 className="text-2xl font-bold text-center">Añadir Factura</h1>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Factura"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    <input
                        type="date"
                        placeholder="Fecha"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Base"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="IVA"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Importe"
                        className="border border-gray-400 p-2 rounded-md"
                    />
                </div>

                <div className="flex row">
                    <button
                        type="button"
                        onClick={close}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer w-3/6"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        onClick={addNewInvoice}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer w-3/6"
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InvoiceModal;
