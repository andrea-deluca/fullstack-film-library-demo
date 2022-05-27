import { Link } from 'react-router-dom';
import { Container, Row, Navbar as BSNavbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Components
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
        <Row>
            <BSNavbar bg="light" variant="light" expand="lg">
                <Container fluid>
                    <Link to='/' className='text-decoration-none'>
                        <BSNavbar.Brand className='fs-1 fw-black text-dark'>
                            ByteLibrary
                        </BSNavbar.Brand>
                    </Link>
                    <SearchBar className="d-none d-lg-flex" />
                    <h6 className='text-dark fw-light'>
                        <FontAwesomeIcon icon={faUser} size='lg' className='me-3' />
                        Hi, Prof. Masala
                    </h6>
                </Container>
            </BSNavbar>
        </Row>
    );
}

export default Navbar;