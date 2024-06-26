import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
    RowData,    
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import "./Billtable.css";
import InvoiceModal from "../Form/InvoiceModal";
import { getClientBills, removeBill, updateBill } from "../../api/api";
import { useBillStore } from "../../store/billStore";
import { useClientStore } from "../../store/clientStore";

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
      updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
  }


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

const defaultColumn: Partial<ColumnDef<Bill>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue);

        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        return (
            <input
                className="w-full"
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            />
        );
    },
};

function BillTable(props: Props) {
    //#region VARIABLES
    const { data, columns } = props;
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [open, setOpen] = useState(false);
    const setTotalBase = useBillStore((state) => state.setTotalBase);
    const setTotalInvoice = useBillStore((state) => state.setTotalInvoice);
    const setBills = useBillStore((state) => state.setBills);
    const client = useClientStore((state) => state.client);
    //#endregion

    //#region FUNCIONES
    const table = useReactTable<Bill>({
        data: data,
        columns,
        defaultColumn: defaultColumn,
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
        meta: {
            updateData: async (rowIndex: any, columnId: any, value: any) => {
                //si no hay cambios no se hace nada
                if (data[rowIndex as keyof {}][columnId as keyof {}] === value ) {
                    return;
                }

                const selectedBill = data[rowIndex];
                const updatedBill = {
                    ...selectedBill,
                    [columnId]:
                        columnId === "base" || columnId === "amount" ? parseFloat(value) : value,
                };
                await updateBill(updatedBill);

                const updatedBills = data.map((bill, index) =>
                    index === rowIndex ? updatedBill : bill
                ) as any;
                setBills(updatedBills);

                if (columnId === "base" || columnId === "amount") {
                    const totalInvoice = updatedBills.reduce(
                        (acc: number, bill: any) => acc + bill.amount,
                        0
                    );
                    const totalBase = updatedBills.reduce(
                        (acc: number, bill: any) => acc + bill.base,
                        0
                    );
                    setTotalBase(totalBase);
                    setTotalInvoice(totalInvoice);
                }
            },
        },
    });

    const onRemoveBill = async (bill: any) => {
        const id = bill.original._id;
        await removeBill(id);
       
        const newBills = await getClientBills(client?._id || 0);
        setBills(newBills);

        const totalInvoice = newBills.reduce(
            (acc: number, bill: any) => acc + bill.amount,
            0
        );
        const totalBase = newBills.reduce(
            (acc: number, bill: any) => acc + bill.base,
            0
        );
        
        setTotalBase(totalBase);
        setTotalInvoice(totalInvoice);
    };
    //#endregion

    return (
        <div style={{ height: "730px" }}>
            <div className="flex gap-2 mb-4">
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
                            <td>
                                <button
                                    onClick={() => onRemoveBill(row)}
                                    className="px-4  bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 gap-2">
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
                    onClick={() => table.nextPage()}
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
