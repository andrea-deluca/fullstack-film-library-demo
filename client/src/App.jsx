import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import AppContainer from './components/AppContainer';

// Views
import * as View from './views';

const App = () => {
  const [library, setLibrary] = useState([]);
  const location = useLocation();

  const pageNotFoundError = {
    status: 404,
    statusText: "Page Not Found",
    message: "Sorry, but the requested page does not exists..."
  };

  return (
    <AppContainer>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<View.Home />} />
        <Route path='/filter/:filter' element={<View.Library library={library} setLibrary={setLibrary} />} />
        <Route path='/add-film' element={<View.AddFilm />} />
        <Route path='/update-film/:id' element={<View.UpdateFilm />} />
        <Route path='*' element={<View.ErrorView error={pageNotFoundError} />} />
      </Routes>
    </AppContainer >
  );
}

export default App;
