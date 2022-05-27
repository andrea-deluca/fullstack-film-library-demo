// import { ToastContainer, Toast } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// const SuccessMessage = ({ show, onClose, ...props }) => {
//     return (
//         <ToastContainer position='top-end' className='mt-5 me-3 border-0'>
//             <Toast bg='success' onClose={onClose} show={show} delay={3000} autohide className="rounded-3 border-0">
//                 <Toast.Header closeButton={false} className='d-flex flex-column align-items-start border-5'>
//                     <strong className="me-auto text-success">
//                         <FontAwesomeIcon icon={faCircleCheck} size="xl" className="me-2" />
//                         Congrats!
//                     </strong>
//                     <small className="mt-3 mb-2 text-dark">
//                         {props.children}
//                     </small>
//                 </Toast.Header>
//             </Toast>
//         </ToastContainer>
//     );
// }

// export default SuccessMessage;