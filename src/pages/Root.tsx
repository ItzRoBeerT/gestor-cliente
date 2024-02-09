import { Link, Outlet } from "react-router-dom";

function RootLayout() {
    
    return (
        <div>
            <Link to="/">Home</Link>
            <Outlet />
        </div>
    )
}

export default RootLayout;