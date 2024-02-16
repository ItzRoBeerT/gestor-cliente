import Client from "../components/custom/Client";
import Clients from "../components/custom/Clients";
import NoClients from "../components/custom/NoClients";
import { useClientStore } from "../store/clientStore";

function Home() {
    const client = useClientStore((state) => state.client);

    return (
        <div className="grid grid-cols-12 min-h-full">
            <div className="col-span-2 bg-neutral-50">
                <Clients />
            </div>
            <div className="col-span-10 flex bg-slate-500">
                {client ? <Client /> : <NoClients />}
            </div>
        </div>
    );
}
export default Home;
