import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

function RootLayout() {
    
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout;