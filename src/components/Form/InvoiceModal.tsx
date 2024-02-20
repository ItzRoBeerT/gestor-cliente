import { useState } from "react";
import { addBill, getClientBills } from "../../api/api";
import { useClientStore } from "../../store/clientStore";
import { cli } from "@tauri-apps/api";
import { useBillStore } from "../../store/billStore";

type ModalProps = {
    open: boolean;
    close: () => void;
};

function InvoiceModal(props: ModalProps) {
    //#region VARIABLES
    const client = useClientStore((state) => state.client);
    const { open, close } = props;
    const setBills = useBillStore((state) => state.setBills);
    const [invoice, setInvoice] = useState("");
    const [date, setDate] = useState("");
    const [base, setBase] = useState(0);
    const [iva, setIva] = useState(0);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState({
        invoice: "",
        date: "",
        base: "",
        iva: "",
        amount: "",
    });
    //#endregion
    //#region FUNCIONES
    const addNewInvoice = async () => {
        if (invoice.trim() === "") {
            setError({ ...error, invoice: "El nombre es obligatorio" });
            return;
        }
        if (date.trim() === "") {
            setError({ ...error, invoice: "", date: "La fecha es obligatoria" });
            return;
        }
        if (base <= 0) {
            setError({
                ...error,
                invoice: "",
                date: "",
                base: "La base imponible debe ser mayor a 0",
            });
            return;
        }
        if (iva <= 0) {
            setError({
                ...error,
                invoice: "",
                date: "",
                base: "",
                iva: "El IVA debe ser mayor a 0",
            });
            return;
        }
        if (amount <= 0) {
            setError({
                ...error,
                invoice: "",
                date: "",
                base: "",
                iva: "",
                amount: "El importe debe ser mayor a 0",
            });
            return;
        }

        const invoiceData = {
            client: client?._id,
            invoice: invoice,
            date,
            base,
            iva,
            amount,
        };
        const res = await addBill(invoiceData);

        if (res.error) return alert("Error al añadir la factura");

        setError({
            invoice: "",
            date: "",
            base: "",
            iva: "",
            amount: "",
        });

        const bills = await getClientBills(client?._id);
        setBills(bills);

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
                        onChange={(e) => setInvoice(e.target.value)}
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    {error.invoice && <p className="text-red-500">{error.invoice}</p>}
                    <input
                        type="date"
                        placeholder="Fecha"
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    {error.date && <p className="text-red-500">{error.date}</p>}
                    <input
                        type="number"
                        placeholder="Base"
                        onChange={(e) => setBase(Number(e.target.value))}
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    {error.base && <p className="text-red-500">{error.base}</p>}
                    <input
                        type="number"
                        placeholder="IVA"
                        onChange={(e) => setIva(Number(e.target.value))}
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    {error.iva && <p className="text-red-500">{error.iva}</p>}
                    <input
                        type="number"
                        placeholder="Importe"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border border-gray-400 p-2 rounded-md"
                    />
                    {error.amount && <p className="text-red-500">{error.amount}</p>}
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
