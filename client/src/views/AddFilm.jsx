import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Components
import FilmForm from "../components/FilmForm";

const AddFilm = () => {
    const navigate = useNavigate()

    return (
        <Row className="p-4 my-4 flex-fill">
            <Col xs={{ span: 12 }} md={{ span: 10 }} xl={{ span: 8 }} className='mx-auto'>
                <Button variant="light" size="sm" className="mb-5 px-4 py-2 rounded-3" onClick={() => navigate(-1, { replace: true })}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size='lg' className='me-3 opacity-25' />
                    <span className="m-0">Go back</span>
                </Button>
                <h1 className="fw-bold text-primary mb-5">Add a new film</h1>
                <FilmForm/>
            </Col>
        </Row>
    );
}

export default AddFilm;