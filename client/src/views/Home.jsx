import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return (
        <Row className="p-4 my-4 flex-fill align-items-center">
            <div className="text-center">
                <h1 className="fw-extrabold text-primary text-center">Welcome to ByteLibrary</h1>
                <h4 className="text-dark">Let's go to your film library!</h4>
                <Link to={"/filter/all"}>
                    <Button size="lg" className="mt-5">
                        <FontAwesomeIcon icon={faRightToBracket} className="me-3" />
                        Enter now
                    </Button>
                </Link>
            </div>
        </Row>
    );
}

export default Home;