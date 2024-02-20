import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import moment from "moment";
import { useEffect, useState } from "react";
import { useBillStore } from "../../store/billStore";
import { useClientStore } from "../../store/clientStore";
import BillTable from "./BillTable";
import { getClientBills } from "../../api/api";
import PDF from "./PDF";

//Header columns
const columns = [
    {
        header: "Factura",
        accessorKey: "invoice",
    },
    {
        header: "Fecha",
        accessorKey: "date",
        cell: (info: { getValue: () => moment.MomentInput }) => {
            return moment(info.getValue()).format("DD/MM/YYYY");
        },
    },
    {
        header: "Base",
        accessorKey: "base",
    },
    {
        header: "IVA",
        accessorKey: "iva",
    },
    {
        header: "Importe",
        accessorKey: "amount",
    },
];

function Client() {
    //#region VARIABLES
    const client = useClientStore((state) => state.client);
    const bills = useBillStore((state) => state.bills);
    const setBills = useBillStore((state) => state.setBills);
    const setTotalBase = useBillStore((state) => state.setTotalBase);
    const setTotalInvoice = useBillStore((state) => state.setTotalInvoice);
    const totalBase = useBillStore((state) => state.totalBase);
    const totalInvoice = useBillStore((state) => state.totalInvoice);
    //#endregion

    //#region FUNCIONES

    useEffect(() => {
        if (client) {
            getClientBills(client._id).then((data) => {
                setBills(data);
                const totalInvoice = data.reduce((acc: number, bill: any) => acc + bill.amount, 0);
                const totalBase = data.reduce((acc: number, bill: any) => acc + bill.base, 0);
                setTotalBase(totalBase);
                setTotalInvoice(totalInvoice);
            });
        }
    }, [client]);
    //#endregion

    return (
        <div className="m-4 w-full grid grid-cols-10 gap-4">
            <section className="col-span-5 gap-4 flex flex-col">
                <h1>{client?.name}</h1>
                <BillTable data={bills} columns={columns} />
                <div className="bg-white rounded-md p-4 flex flex-col w-fit">
                    <span className="font-bold text-2xl">
                        Total base: <span className="text-blue-500">{totalBase}€</span>
                    </span>
                    <span className="font-bold text-2xl">
                        Total importe: <span className="text-blue-500">{totalInvoice}€</span>
                    </span>
                </div>
            </section>
            <section className="col-span-5">
                <PDFDownloadLink document={<PDF columns={columns} data={bills} />} fileName="test">
                    {({ loading }) => (loading ? "Loading document..." : "Download now!")}
                </PDFDownloadLink>

                <PDFViewer width={"100%"} height={"80%"} showToolbar={true}>
                    <PDF columns={columns} data={bills} />
                </PDFViewer>
            </section>
        </div>
    );
}

export default Client;
