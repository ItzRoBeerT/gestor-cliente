import { create } from "zustand";
import { Bill } from "../models/types";

interface BillState {
    bill: Bill | null;
    bills: Bill[];
    totalBase: number;
    totalInvoice: number;
    setBill: (bill: Bill) => void;
    setBills: (bills: Bill[]) => void;
    setTotalBase: (total: number) => void;
    setTotalInvoice: (invoice: number) => void;
}

export const useBillStore = create<BillState>((set) => ({
    bill: null,
    bills: [],
    totalBase: 0,
    totalInvoice: 0,
    setBill: (bill) => set({ bill }),
    setBills: (bills: Bill[]) => set({ bills }),
    setTotalBase: (totalBase: number) => set({ totalBase: Number(totalBase.toFixed(2)) }),
    setTotalInvoice: (totalInvoice: number) =>
        set({ totalInvoice: Number(totalInvoice.toFixed(2)) }),
}));
