import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Hooks
import useFilmLibrary from './hooks/useFilmLibrary';
import useMessage from './hooks/useMessage';

// Components
import AppContainer from './components/AppContainer';

// Views
import Library from './views/Library';
import AddFilm from './views/AddFilm';
import UpdateFilm from './views/UpdateFilm'

const App = () => {
  const [library, setLibrary, updateLibrary] = useFilmLibrary();
  const [message, hideMessage, showMessage] = useMessage();

  const location = useLocation();

  return (
    <AppContainer message={message} hideMessage={hideMessage}>
      <Routes location={location} key={location.pathname}>
        <Route path='/:filter' element={<Library library={library} setLibrary={setLibrary} updateLibrary={updateLibrary} showMessage={showMessage} />} />
        <Route path='/add-film' element={<AddFilm addFilm={updateLibrary.addFilm} showMessage={showMessage} />} />
        <Route path='/update-film/:filmID' element={<UpdateFilm library={library} updateFilm={updateLibrary.updateFilm} showMessage={showMessage} />} />
        <Route path='*' element={<Navigate to='/all' replace={true} />} />
      </Routes>
    </AppContainer >
  );
}

export default App;
