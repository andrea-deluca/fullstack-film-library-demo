import { useState } from "react"

const useFilmLibrary = () => {
    const [library, setLibrary] = useState([]);

    const setFavorite = (id) => {
        setLibrary(library.map(film => {
            return film.id === id ? { ...film, favorite: !film.favorite } : film;
        }));
    }

    const setRating = (id, rating) => {
        setLibrary(library.map(film => {
            return film.id === id ? { ...film, score: rating } : film;
        }));
    }

    const deleteFilm = (id) => {
        setLibrary(library.filter(film => film.id !== id));
    }

    const addFilm = (film) => {
        let id = 0;
        library.forEach(film => {
            if (film.id > id) {
                id = film.id;
            }
        });

        setLibrary(oldLibrary => [...oldLibrary, { ...film, id: id + 1 }]);
    }

    const updateFilm = (values) => {
        setLibrary(library => library.map(film => {
            return film.id === values.id ? Object.assign({}, values) : film;
        }));
    }

    const updateLibrary = { setFavorite, setRating, deleteFilm, addFilm, updateFilm }

    return [library, setLibrary, updateLibrary];
}

export default useFilmLibrary;