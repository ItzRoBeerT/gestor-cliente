import Client from "../components/custom/Client";
import Clients from "../components/custom/Clients";
import { useClientStore } from "../store/clientStore";

function Home() {
    const client = useClientStore((state) => state.client);

    return (
        <div className="bg-neutral-950 text-white grid grid-cols-12 h-screen">
            <div className="col-span-2 bg-neutral-950 border">
                <Clients />
            </div>
            <div className="col-span-10 flex bg-slate-500">
                {client ? <Client /> : <h1>Client not selected</h1>}
            </div>
        </div>
    );
}
export default Home;
