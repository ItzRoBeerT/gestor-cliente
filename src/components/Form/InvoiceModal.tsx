type ModalProps = {
    open: boolean;
    close: () => void;
};

function InvoiceModal(props: ModalProps) {

    return (
        <div>
            <h1>Invoice Modal</h1>
        </div>
    )
}

export default InvoiceModal;
