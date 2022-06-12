import { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
    const [session] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (session.loggedIn)
            navigate('/filter/all', { replace: true });
    }, [session.loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!session.loggedIn)
        return (
            <Row className="p-4 my-4 flex-fill align-items-center">
                <div className="text-center">
                    <h1 className="fw-extrabold text-primary text-center">Welcome to ByteLibrary</h1>
                    <h4 className="text-dark">Let's go to your film library!</h4>
                </div>
                <Col xs={{ span: 12 }} lg={{ span: 6 }} className="mx-auto">
                    <LoginForm />
                </Col>
            </Row>
        );
}

export default Home;