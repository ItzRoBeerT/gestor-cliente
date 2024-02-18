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
        header: "Importe",
        accessorKey: "amount",
    },
    {
        header: "IVA",
        accessorKey: "iva",
    },
    {
        header: "Base",
        accessorKey: "base",
    },
];

function Client() {
    //#region VARIABLES
    const client = useClientStore((state) => state.client);
    const bills = useBillStore((state) => state.bills);
    const setBills = useBillStore((state) => state.setBills);
    const setTotal = useBillStore((state) => state.setTotal);
    const total = useBillStore((state) => state.total);
    //#endregion

    //#region FUNCIONES

    useEffect(() => {
        if (client) {
            getClientBills(client._id).then((data) => {
                setBills(data);
                const total = data.reduce((acc: number, bill: any) => acc + bill.amount, 0);
                setTotal(total);
            });
        }
    }, [client]);
    //#endregion

    return (
        <div className="m-4 w-full grid grid-cols-10 gap-4">
            <section className="col-span-5">
                <h1>{client?.name}</h1>
                <BillTable data={bills} columns={columns} />
                <p>Total: {total}</p>
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
