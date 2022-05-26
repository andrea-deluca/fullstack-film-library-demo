import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';

import { getFormattedDate } from '../helpers/date';

// Hooks
import useModal from '../hooks/useModal';

// Components
import ConfirmationModal from './ConfirmationModal';
import axios from 'axios';

const FilmCard = ({ film, deleteFilm, showMessage, setDirty }) => {
    const [loading, setLoading] = useState(false);
    const [modal, onShowModal, onHideModal, onConfirmModal] = useModal(() => {
        setLoading(true);
        axios.delete(`api/films/delete-film/${film.id}`)
            .then(() => {
                setLoading(false);
                setDirty(true);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
        // deleteFilm(film.id);
        showMessage('Selected film has been removed successfully from your library.');
    });

    const setRating = (rating) => {
        if (rating !== film.rating) {
            axios.put(`/api/films/update-rating/${film.id}`, {
                rating: rating
            })
                .then(() => {
                    setDirty(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const setFavorite = (favorite) => {
        axios.put(`/api/films/update-favorite/${film.id}`, {
            favorite: favorite ? 1 : 0
        }).then(() => {
            setDirty(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    const titleClass = classNames({
        'fw-extrabold': true,
        'text-dark': !film.favorite,
        'text-secondary': film.favorite,
    });

    const iconClass = classNames({
        'favorite-icon': true,
        'set-favorite text-gray': !film.favorite,
        'unset-favorite text-secondary': film.favorite
    });

    return (
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
            <ConfirmationModal show={modal.show} loading={loading} onHide={onHideModal} onConfirm={onConfirmModal} />
            <Card className='border-0 shadow h-100'>
                <Card.Img variant="top" src={film.image} className='card-image' />
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title className={titleClass} style={{ transition: 'all .3s' }}>{film.title}</Card.Title>
                        <FontAwesomeIcon icon={faHeart} size='lg' className={iconClass}
                            onClick={() => setFavorite(!film.favorite)} />
                    </div>
                    <Card.Text className='fw-light text-dark'>{film.plot ? film.plot : 'Nessuna descrizione disponibile.'}</Card.Text>
                </Card.Body>
                <Card.Footer className='bg-white border-0 mb-3'>
                    <Card.Text className='fw-light text-muted mt-3'>{film.watchdate ? `Seen ${getFormattedDate(film.watchdate)}` : 'Unseen'}</Card.Text>
                    {film.rating > 0 && [...Array(film.rating)].map((item, index) => {
                        return <FontAwesomeIcon key={index} icon={faStar} className='text-secondary star-icon star-full me-1' onClick={() => {
                            film.rating === 1 ? setRating(index) : setRating(index + 1)
                        }
                        } />
                    })}
                    {film.rating ? [...Array(5 - film.rating)].map((item, index) => {
                        return <FontAwesomeIcon key={index} icon={faStarEmpty} className='text-secondary star-icon star-empty me-1' onClick={() => setRating(film.rating + index + 1)} />
                    }) : [...Array(5)].map((item, index) => {
                        return <FontAwesomeIcon key={index} icon={faStarEmpty} className='text-secondary star-icon star-empty me-1' onClick={() => setRating(index + 1)} />
                    })}
                    <hr />
                    <Link to={`/update-film/${film.id}`}>
                        <Button variant="outline-dark" className='me-3'>
                            <FontAwesomeIcon icon={faPencil} className='me-2' />
                            <span>Edit</span>
                        </Button>
                    </Link>
                    <Button variant="outline-danger" onClick={onShowModal}>
                        <FontAwesomeIcon icon={faTrash} className='me-2' />
                        <span>Delete</span>
                    </Button>
                </Card.Footer>
            </Card>
        </Col >
    );
}

export default FilmCard;