import { useEffect, useState } from "react";
import { useBillStore } from "../../store/billStore";
import { useClientStore } from "../../store/clientStore";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BillTable from "./BillTable";
import { getClientBills } from "../../api/api";
import PDF from "./PDF";

//TData
type Bill = {
    _id: number;
    invoice: string;
    amount: number;
    date: string;
    iva: number;
    base: number;
};

function Client() {
    //#region VARIABLES
    const [bills, setBills] = useState<Bill[]>([]);
    const client = useClientStore((state) => state.client);
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
                <BillTable data={bills} />
                <p>Total: {total}</p>
            </section>
            <section className="col-span-5">
                <PDFDownloadLink document={<PDF />} fileName="test">
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download now!"
                    }
                </PDFDownloadLink>

                <PDFViewer width={'100%'} height={'80%'} showToolbar={true}>
                    <PDF />
                </PDFViewer>
            </section>
        </div>
    );
}

export default Client;
