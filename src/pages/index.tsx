import Clients from "../components/custom/Clients";

function Home() {
    return (
        <div className="bg-neutral-950 text-white h-screen grid grid-cols-12">
            <div className="col-span-2 bg-neutral-950 border">
             <Clients />
            </div>
            <div className="col-span-10 flex bg-slate-500"></div>
        </div>
    );
}
export default Home;