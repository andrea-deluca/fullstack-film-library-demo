import { useParams, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';

// Helpers
import { isIncludedInLastMonth } from '../helpers/date';

// Constants
import filters from '../constants/filters';

// Components
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import FilteredLibrary from '../components/FilteredLibrary';

const Library = ({ library, updateLibrary, showMessage }) => {
    const { filter } = useParams();

    const filterMatched = filters.find(item => {
        return item.url.slice(1) === filter;
    })

    if (!filterMatched) {
        return <Navigate to={'/all'} replace />
    }

    const filteredLibrary = library.filter(film => {
        switch (filter) {
            case 'favorites':
                return film.favorite;
            case 'best-rated':
                return film.score >= 5;
            case 'seen-last-month':
                return isIncludedInLastMonth(film.watchDate);
            case 'unseen':
                return !film.watchDate;
            default:
                return true;
        }
    });

    return (
        <Row className='p-4 my-4 flex-fill'>
            <SearchBar className="d-flex d-lg-none mb-5" />
            <Sidebar selectedFilter={filter} />
            <FilteredLibrary library={filteredLibrary} updateLibrary={updateLibrary} showMessage={showMessage} />
        </Row>
    );
}

export default Library;