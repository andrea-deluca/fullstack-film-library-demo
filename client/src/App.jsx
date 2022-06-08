import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import AppContainer from './components/AppContainer';
import ProtectedRoute from './components/ProtectedRoute';

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
    <AppContainer setLibrary={setLibrary}>
      <Routes location={location} key={location.pathname}>
        <Route index path='/' element={<View.Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/filter/:filter' element={<View.Library library={library} setLibrary={setLibrary} />} />
          <Route path='/add-film' element={<View.AddFilm />} />
          <Route path='/update-film/:id' element={<View.UpdateFilm />} />
        </Route>
        <Route path='*' element={<View.ErrorView error={pageNotFoundError} />} />
      </Routes>
    </AppContainer >
  );
}

export default App;
