import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getToday } from "../helpers/date";

// Services
import api from "../services/api";

// Views
import ErrorView from "./ErrorView";

// Components
import FilmForm from "../components/FilmForm";

const UpdateFilm = () => {
    const [initialValues, setInitialValues] = useState();
    const [error, setError] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.getFilm(id)
            .then(film => {
                setError({});
                const values = {
                    ...film,
                    plot: film.plot || "",
                    image: film.image || "",
                    favorite: film.favorite === 1 ? true : false,
                    watchDateSwitch: film.watchdate ? true : false,
                    watchdate: film.watchdate || getToday(),
                };
                setInitialValues(values);
            })
            .catch(err => {
                setError({ show: true, ...err });
            })
    }, [id])

    if (error.show) {
        return (
            <ErrorView error={error} />
        )
    }

    return (
        <Row className="p-4 my-4 flex-fill">
            <Col xs={{ span: 12 }} md={{ span: 10 }} xl={{ span: 8 }} className='mx-auto'>
                <Button variant="light" size="sm" className="mb-5 px-4 py-2 rounded-3" onClick={() => navigate(-1, { replace: true })}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size='lg' className='me-3 opacity-25' />
                    <span className="m-0">Go back</span>
                </Button>
                <h1 className="fw-bold text-primary mb-5">Edit film</h1>
                {initialValues && <FilmForm update id={id} initialValues={initialValues} />}
            </Col>
        </Row>
    );
}

export default UpdateFilm;