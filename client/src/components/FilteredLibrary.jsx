import { Link } from 'react-router-dom';
import { Col, CardGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

// Components
import FilmCard from './FilmCard'

const FilteredLibrary = ({ library, setDirty }) => {
    return (
        <Col xs={{ span: 12 }} lg={{ span: 9 }} className='mt-5 mt-lg-0'>
            <div className='d-flex justify-content-between'>
                <h3 className='fw-bold mb-3 text-dark'>
                    <FontAwesomeIcon icon={faFilm} size='lg' className='me-3' />
                    Library
                </h3>
                <Link to='/add-film'>
                    <Button variant='primary' size='sm' className='fw-bold m px-3 h-100 rounded-3'>
                        <FontAwesomeIcon icon={faCirclePlus} size='lg' className='me-3' />
                        Add Film
                    </Button>
                </Link>
            </div>
            {library.length !== 0 &&
                <div className='mb-5'>
                    <p className='text-muted fw-light mb-4'>This is your film library.</p>
                </div>
            }
            <CardGroup className='row g-3'>
                {library.length === 0 ? <h6 className='my-5 text-dark'>I'm sorry... no films were found here.</h6>
                    : library.map((film, index) => {
                        return (
                            <FilmCard key={index} film={film} setDirty={setDirty} />
                        )
                    })}
            </CardGroup>
        </Col>
    );
}

export default FilteredLibrary;