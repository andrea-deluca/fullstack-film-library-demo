import axios from "axios";

const api = {
    getFilms: (filter) => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films/${filter}`)
                .then(res => resolve(res.data))
                .catch(err => reject({ message: err.response.data, status: err.response.status, statusText: err.response.statusText }));
        })
    },

    getFilm: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject({ message: err.response.data, status: err.response.status, statusText: err.response.statusText }));
        })
    },

    updateFilm: (id, film) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-film/${id}`, film)
                .then(() => resolve())
                .catch(err => reject(err.response.data));
        })
    },

    addFilm: (film) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/films/add-film', film)
                .then(() => resolve())
                .catch(err => reject(err.response.data));
        })
    },

    deleteFilm: (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/films/delete-film/${id}`)
                .then(() => resolve())
                .catch(err => reject(err.response.data));
        })
    },

    updateRating: (id, rating) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-rating/${id}`, { rating: rating })
                .then(() => resolve())
                .catch(err => reject(err.response.data));
        })
    },

    updateFavorite: (id, favorite) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-favorite/${id}`, { favorite: favorite ? 1 : 0 })
                .then(() => resolve())
                .catch((err) => reject(err.response.data));
        })
    },

    login: (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/sessions', credentials, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data));
        })
    },

    logout: () => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/sessions/current',)
                .then(() => resolve())
                .catch((err) => reject(err.response.data));
        })
    },

    getUserInfo: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/sessions/current')
                .then((res) => resolve(res.data))
                .catch((err) => reject(err.response.data));
        })
    }
}

export default api;