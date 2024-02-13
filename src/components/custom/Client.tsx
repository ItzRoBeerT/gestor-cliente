import { useBillStore } from "../../store/billStore";
import { useClientStore } from "../../store/clientStore";

import BillTable from "./BillTable";

function Client() {
    const client = useClientStore((state) => state.client);
    const total = useBillStore((state) => state.total);
    return (
        <div>
            <h1>{client?.name}</h1>
            <BillTable />
            <p>Total: {total}</p>
        </div>
    );
}

export default Client;
