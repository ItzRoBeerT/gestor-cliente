import { create } from "zustand";
import { Bill } from "../models/types";

interface BillState {
    bill: Bill | null;
    bills: Bill[];
    total: number;
    setBill: (bill: Bill) => void;
    setBills: (bills: Bill[]) => void;  
    setTotal: (total: number) => void;
}

export const useBillStore = create<BillState>((set) => ({
    bill: null,
    bills: [],
    total: 0,
    setBill: (bill) => set({ bill }),
    setBills: (bills: Bill[]) => set({ bills }),
    setTotal: (total:  number) => set({ total }),    
}));

