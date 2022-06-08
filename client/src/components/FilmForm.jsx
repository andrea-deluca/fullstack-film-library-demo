import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';

// Helpers
import { getToday } from '../helpers/date';

// Services
import api from '../services/api';

// Hooks
import useNotification from '../hooks/useNotification';

// Constants
import filmForm from '../constants/filmForm';

// Validations
import FilmSchema from '../validations/FilmSchema';

// Components
import Input from './Input';

const FilmForm = ({ update, id, ...props }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const notify = useNotification();

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
            api.updateFilm(id, film)
                .then(() => {
                    setLoading(false);
                    notify.success("Film successfully edited");
                    navigate(-1, { replace: true });
                })
                .catch((err) => {
                    setLoading(false);
                    notify.error(err);
                })
        } else {
            api.addFilm(film)
                .then(() => {
                    notify.success("Film successfully added");
                    navigate(-1, { replace: true });
                })
                .catch(err => notify.error(err))
                .finally(() => setLoading(false));
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