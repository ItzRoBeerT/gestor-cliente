import Modal from "../Form/Modal";
import { useState } from "react";
import logo from '../../assets/anerol-logo.webp'
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
        <header className=" bg-red-400 p-1 flex justify-between" style={{backgroundColor: '#bb0c24'}}>
            <img src={logo} alt="logo" width={"180px"} />
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
