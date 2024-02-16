function NoClients() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12 "
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
            <p className=" mt-4 text-lg text-center">Aún no has seleccionado ningún cliente.</p>
        </div>
    );
}

export default NoClients;
