import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

function RootLayout() {
    
    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout;