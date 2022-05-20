import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';

// Helpers
import { getFormattedDate, getToday } from '../helpers/date';

// Constants
import filmForm from '../constants/filmForm';

// Validations
import FilmSchema from '../validations/FilmSchema';

// Components
import Input from './Input';

const FilmForm = ({ addFilm, updateFilm, update, showMessage, ...props }) => {
    const navigate = useNavigate();

    const initialValues = update ? props.initialValues : {
        title: '',
        plot: '',
        image: '',
        favorite: false,
        watchDateSwitch: false,
        watchDate: getToday(),
        score: '',
    }

    const handleSubmit = (values) => {
        const film = {
            ...values,
            watchDate: values.watchDateSwitch ? getFormattedDate(values.watchDate) : undefined,
            score: parseInt(values.score),
        };

        update ? updateFilm(film) : addFilm(film);
        update ? showMessage('Selected film has been successfully edited.') : showMessage('New film has been successfully inserted in your library.')

        navigate(-1, { replace: true });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={FilmSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ values, touched, isValid }) => {
                const disabledSubmit = (!update && !touched.title && !touched.score) || !isValid;
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