export type Client = {
    _id: number;
    name: string;
};

export type Bill = {
    _id: number;
    invoice: string;
    amount: number;
    date: string;
    iva: number;
    base: number;
};
