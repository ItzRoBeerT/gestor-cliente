import { create } from "zustand";
import { Client } from "../models/types";

interface ClientState {
    client: Client | null;
    clients : Client[];
    setClient: (client: Client) => void;
    setClients: (clients: Client[]) => void;
}

export const useClientStore = create<ClientState>((set) => ({
    client: null,
    clients: [],
    setClient: (client: Client | null) => set({ client }),
    setClients: (clients) => set({clients}),
}));
