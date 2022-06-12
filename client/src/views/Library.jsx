import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';

// Services
import api from '../services/api';

// Constants
import filters from '../constants/filters';

// Views
import ErrorView from './ErrorView';

// Components
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import FilteredLibrary from '../components/FilteredLibrary';

const Library = ({ library, setLibrary }) => {
    const [error, setError] = useState({});
    const [dirty, setDirty] = useState(true);

    const { filter } = useParams();

    useEffect(() => {
        if (dirty) {
            api.getFilms(filter)
                .then(films => {
                    setError({});
                    setLibrary(films);
                    setDirty(false);
                })
                .catch(err => {
                    err.status === 404 && setLibrary([]);
                    err.status === 500 && setError({ show: true, ...err });
                })
        }
    }, [filter, dirty]); // eslint-disable-line react-hooks/exhaustive-deps

    const filterMatched = filters.find(item => {
        return item.url === filter;
    });

    if (!filterMatched) {
        return <Navigate to={'/not-found'} replace />
    }

    if (error.show) {
        return (
            <ErrorView error={error} />
        )
    }

    return (
        <Row className='p-4 my-4 flex-fill'>
            <SearchBar className="d-flex d-lg-none mb-5" />
            <Sidebar selectedFilter={filter} />
            <FilteredLibrary library={library} setDirty={setDirty} />
        </Row>
    );
}

export default Library;