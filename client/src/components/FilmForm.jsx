import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';

// Helpers
import { getToday } from '../helpers/date';

// Constants
import filmForm from '../constants/filmForm';

// Validations
import FilmSchema from '../validations/FilmSchema';

// Components
import Input from './Input';
import axios from 'axios';

const FilmForm = ({ addFilm, updateFilm, update, showMessage, id, ...props }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = update ? props.initialValues : {
        title: '',
        plot: '',
        image: '',
        favorite: false,
        watchDateSwitch: false,
        watchdate: getToday(),
        rating: '',
    }

    const handleSubmit = (values) => {
        setLoading(true);

        const film = {
            ...values,
            favorite: values.favorite ? 1 : 0,
            watchdate: values.watchDateSwitch ? values.watchdate : undefined,
            rating: parseInt(values.rating),
            user: 1
        };

        if (update) {
            axios.put(`/api/films/update-film/${id}`, film)
                .then(() => {
                    showMessage('Selected film has been successfully edited.')
                    navigate(-1, { replace: true });
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            axios.post('/api/films/add-film', film)
                .then(() => {
                    setLoading(false);
                    showMessage('New film has been successfully inserted in your library.')
                    navigate(-1, { replace: true });
                })
                .cathc(err => {
                    console.log(err);
                    setLoading(false);
                })
        }
    }
    return (
        <Formik initialValues={initialValues} validationSchema={FilmSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ values, touched, isValid }) => {
                const disabledSubmit = (!update && !touched.title && !touched.rating) || !isValid;
                return (
                    <Form>
                        {filmForm.map((input, index) => {
                            return (
                                <Input
                                    key={index}
                                    id={input.id}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    label={input.label}
                                    as={input.as}
                                    rows={input.rows}
                                    options={input.options}
                                    max={input.max}
                                    disabled={input.id === 'add-film-watchdate' && !values.watchDateSwitch} />
                            );
                        })}
                        <div className='mt-5'>
                            <Button variant='light' type='reset' className='px-4 me-3'>
                                Reset
                            </Button>
                            <Button variant='primary' type='submit' className='px-4' disabled={disabledSubmit}>
                                {loading && <Spinner animation='border' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                                Save
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default FilmForm;