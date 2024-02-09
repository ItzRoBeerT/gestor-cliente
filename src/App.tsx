//import Accordion from "./components/ui/Accordion";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages";

import RootLayout from "./pages/Root";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
