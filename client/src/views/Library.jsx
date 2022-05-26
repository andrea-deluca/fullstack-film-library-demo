import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import axios from 'axios';

// Constants
import filters from '../constants/filters';

// Components
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import FilteredLibrary from '../components/FilteredLibrary';

import ServerError from '../views/ServerError';

const Library = ({ library, setLibrary, updateLibrary, showMessage }) => {
    const [error, setError] = useState({});
    const { filter } = useParams();

    useEffect(() => {
        axios.get(`/api/films/${filter}`)
            .then(res => {
                setLibrary(res.data);
            })
            .catch(err => {
                console.log(err)
                err.response.status === 404 && setLibrary([]);
                err.response.status === 500 && setError({ show: true, message: err.message, error: err.response });
            })
    }, [filter]);

    const filterMatched = filters.find(item => {
        return item.url.slice(1) === filter;
    });

    if (!filterMatched) {
        return <Navigate to={'/'} replace />
    }

    if (error.show) {
        return (
            <ServerError message={error.message} error={error.error} />
        )
    }

    return (
        <Row className='p-4 my-4 flex-fill'>
            <SearchBar className="d-flex d-lg-none mb-5" />
            <Sidebar selectedFilter={filter} />
            <FilteredLibrary library={library} updateLibrary={updateLibrary} showMessage={showMessage} />
        </Row>
    );
}

export default Library;