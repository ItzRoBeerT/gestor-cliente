import { Link } from "react-router-dom";
import Modal from "../Form/Modal";
import { useState } from "react";

function Header() {
    const [open, setOpen] = useState(false);

    //#region FUNCTIONS
    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
    //#endregion
    return (
        <header className="sticky top-0 bg-red-400 p-1 flex justify-between">
            <Link to="/">Home</Link>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full "
            >
                Nuevo cliente
            </button>

            <Modal open={open} close={closeModal} />
        </header>
    );
}

export default Header;
