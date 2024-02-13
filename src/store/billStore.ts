import { create } from "zustand";
import { Bill } from "../models/types";

interface BillState {
    bill: Bill | null;
    total: number;
    setBill: (bill: Bill) => void;
    setTotal: (total: number) => void;
}

export const useBillStore = create<BillState>((set) => ({
    bill: null,
    total: 0,
    setBill: (bill) => set({ bill }),
    setTotal: (total:  number) => set({ total }),    
}));

