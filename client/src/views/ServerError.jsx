import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

const ServerError = ({ error, message }) => {
    return (
        <Row className='p-4 my-4 mx-auto flex-fill text-dark align-items-center'>
            <div className='d-flex flex-column align-items-center'>
                <FontAwesomeIcon icon={error.status === 500 ? faFaceDizzy : faFaceFrown} size={'8x'} className={'my-5'} />
                <h1 className='mb-0 fw-bold'>{error.status}</h1>
                <h3 className='mb-0 fw-bold'>{error.statusText}</h3>
                <small>{message}</small>
                <div className='my-5'>
                    <Link to={'/all'}>
                        <Button size='xs'>Back to home</Button>
                    </Link>
                </div>
            </div>
        </Row>
    );
}

export default ServerError;