import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="border-0">
                <Modal.Title className="fw-bold text-danger">Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="small text-dark">
                <div className="mb-5">You are trying to remove a film from your library.</div>
                <h6 className="fw-bold m-0">
                    Are you sure to proceed?
                </h6>
                <span className="fw-bold text-danger">Please confirm your choice.</span>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="light" onClick={onHide} className='fw-bold rounded-3'>
                    <span className="opacity-50">Close</span>
                </Button>
                <Button variant="danger" onClick={onConfirm} className='fw-bold rounded-3'>
                    <span className="text-light">Confirm</span>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;