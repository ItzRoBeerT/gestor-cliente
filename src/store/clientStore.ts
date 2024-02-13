import { create } from "zustand";
import { Client } from "../models/types";

interface ClientState {
    client: Client | null;
    setClient: (client: Client) => void;
}

export const useClientStore = create<ClientState>((set) => ({
    client: null,
    setClient: (client) => set({ client }),
}));
