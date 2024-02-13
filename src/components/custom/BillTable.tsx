import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import moment from "moment";
import { getClientBills } from "../../api/api";
import { useClientStore } from "../../store/clientStore";
import { useBillStore } from "../../store/billStore";
import "./Billtable.css";
//TData
type Bill = {
    _id: number;
    invoice: string;
    amount: number;
    date: string;
    iva: number;
    base: number;
};

function BillTable() {
    const [bills, setBills] = useState<Bill[]>([]);
    const client = useClientStore((state) => state.client);
    const setTotal = useBillStore((state) => state.setTotal);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
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
    const table = useReactTable({
        data: bills,
        columns,
        getCoreRowModel: getCoreRowModel<Bill>(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting as any,
        onGlobalFilterChange: setFiltering as any,
    });

    useEffect(() => {
        if (client) {
            getClientBills(client._id).then((data) => {
                setBills(data);
                const total = data.reduce((acc: number, bill: any) => acc + bill.amount, 0);
                setTotal(total);
            });
        }
    }, [client]);

    return (
        <>
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                className="border text-black border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted()
                                        ? header.column.getIsSorted() === "asc"
                                            ? "up"
                                            : "down"
                                        : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cel) => (
                                <td key={cel.id}>
                                    {flexRender(cel.column.columnDef.cell, cel.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.setPageIndex(0)}
                >
                    Primera página
                </button>
                <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.nextPage()}
                >
                    Siguiente
                </button>
                <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.previousPage()}
                >
                    Anterior
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                    Última página
                </button>
            </div>
        </>
    );
}

export default BillTable;
