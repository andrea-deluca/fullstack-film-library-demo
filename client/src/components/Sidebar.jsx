import { NavLink } from 'react-router-dom';
import { Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// Constants
import filters from '../constants/filters';

const Sidebar = () => {
    return (
        <Col xs={{ span: 12 }} lg={{ span: 3 }} className="h-100">
            <h3 className='fw-bold text-dark mb-3'>
                <FontAwesomeIcon icon={faFilter} className='me-2' />
                Filters
            </h3>
            <p className='text-muted fw-light mb-5'>Select a filter from the list below.</p>
            <Nav className="flex-column" variant='pills'>
                {filters.map((filter, index) => {
                    return (
                        <NavLink key={index} to={`/filter/${filter.url}`} className={({ isActive }) => !isActive ?
                            'sidebar-item fw-bold p-3 mb-3 rounded-3 text-decoration-none' :
                            'sidebar-item fw-bold p-3 mb-3 rounded-3 text-decoration-none bg-primary text-white'
                        }>
                            {filter.label}
                        </NavLink>
                    );
                })}
            </Nav>
        </Col>
    );
}

export default Sidebar;