import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

// Components
import Navbar from './Navbar';
import Footer from './Footer';

const AppContainer = ({ ...props }) => {
    return (
        <Container fluid className="app-container">
            <ToastContainer newestOnTop={false} />
            < Navbar />
            {props.children}
            < Footer />
        </Container>
    );
}

export default AppContainer;