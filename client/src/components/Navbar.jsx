import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Navbar as BSNavbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

// Components
import SearchBar from './SearchBar';
import api from '../services/api';
import useNotification from '../hooks/useNotification';

const Navbar = ({ setLibrary }) => {
    const [session, setSession] = useContext(AuthContext);
    const navigate = useNavigate();
    const notify = useNotification();

    const handleLogout = () => {
        api.logout()
            .then(() => {
                setSession({ user: undefined, loggedIn: false });
                setLibrary([]);
                navigate('/', { replace: true });
            })
            .catch((err) => notify.error(err));
    }

    return (
        <Row>
            <BSNavbar bg="light" variant="light" expand="lg">
                <Container fluid>
                    <Link to='/' className='text-decoration-none'>
                        <BSNavbar.Brand className='fs-1 fw-black text-dark'>
                            ByteLibrary
                        </BSNavbar.Brand>
                    </Link>
                    {session.loggedIn && <SearchBar className="d-none d-lg-flex" />}
                    <div className='d-flex align-items-baseline'>
                        <h6 className='text-dark fw-light'>
                            <FontAwesomeIcon icon={faUser} size='lg' className='me-3' />
                            Hi, {session.user ? session.user.name : "user"}
                        </h6>
                        {session.loggedIn && <Button variant='secondary' size='sm' className='ms-4 px-3 text-white fw-semibold' onClick={handleLogout}>
                            Logout
                        </Button>}
                    </div>
                </Container>
            </BSNavbar>
        </Row>
    );
}

export default Navbar;