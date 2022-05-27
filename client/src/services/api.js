import axios from "axios";

const api = {
    getFilms: (filter) => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films/${filter}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    getFilm: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films/${id}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    updateFilm: (id, film) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-film/${id}`, film)
                .then(() => {
                    const response = {
                        statusText: "Great!",
                        message: "Selected film has been successfully edited."
                    }
                    resolve(response);
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    addFilm: (film) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/films/add-film', film)
                .then(() => {
                    const response = {
                        statusText: "Great!",
                        message: "New film has been successfully inserted in your library."
                    }
                    resolve(response);
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    deleteFilm: (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/films/delete-film/${id}`)
                .then(() => {
                    const response = {
                        statusText: "Great!",
                        message: "Selected film has been removed successfully from your library."
                    }
                    resolve(response);
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    updateRating: (id, rating) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-rating/${id}`, { rating: rating })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    },

    updateFavorite: (id, favorite) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/films/update-favorite/${id}`, { favorite: favorite ? 1 : 0 })
                .then(() => {
                    resolve();
                }).catch((err) => {
                    const error = {
                        status: err.response.status,
                        statusText: err.response.statusText,
                        message: err.message
                    }
                    reject(error);
                })
        })
    }
}

export default api;