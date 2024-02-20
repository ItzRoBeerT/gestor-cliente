import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import "./Billtable.css";
import InvoiceModal from "../Form/InvoiceModal";

//TData
type Bill = {
    _id: number;
    invoice: string;
    amount: number;
    date: string;
    iva: number;
    base: number;
};

//definir props del componente

type Props = {
    data: Bill[];
    columns: any[];
};

function BillTable(props: Props) {
    //#region VARIABLES
    const { data, columns } = props;
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [open, setOpen] = useState(false);
    //#endregion

    const table = useReactTable({
        data: data,
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

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    value={filtering}
                    placeholder="Busca para filtrar..."
                    onChange={(e) => setFiltering(e.target.value)}
                    className="border text-black border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpen(true)}
                >
                    Agregar factura
                </button>
            </div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="cursor-pointer">
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
                                            ? "⬆️"
                                            : "⬇️"
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

            <div className="flex justify-center mt-4 gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                    Última página
                </button>
                <button
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.previousPage()}
                >
                    Anterior
                </button>
                <button
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        if (table.getPageCount() < table.getPageCount() - 1) {
                            table.nextPage();
                        }
                    }}
                >
                    Siguiente
                </button>
                <button
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => table.setPageIndex(0)}
                >
                    Primera página
                </button>
            </div>
            <InvoiceModal open={open} close={() => setOpen(false)} />
        </div>
    );
}

export default BillTable;
