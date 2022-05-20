import { Container } from "react-bootstrap";

// Components
import Navbar from './Navbar';
import Footer from './Footer';
import SuccessMessage from './SuccessMessage'

const AppContainer = ({ message, hideMessage, ...props }) => {
    return (
        <Container fluid className="app-container">
            < Navbar />
            <SuccessMessage show={message.show} onClose={hideMessage}>
                {message.response}
            </SuccessMessage>
            {props.children}
            < Footer />
        </Container>
    );
}

export default AppContainer;