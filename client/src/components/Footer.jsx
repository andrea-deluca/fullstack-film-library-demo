import { Row } from 'react-bootstrap';

// Constants
import authors from '../constants/authors';

const Footer = () => {
    return (
        <Row className='footer'>
            <footer className='bg-light text-dark p-4 px-5'>
                <h6 className='fw-bold mb-4'>Copyright &copy;
                    <a href="https://github.com/polito-AW1-2022-exams/biglab2-bytecoders" rel='noreferrer' target='_blank' className='link-dark text-decoration-none ms-1'>
                        Bytecoders 2022
                    </a>
                </h6>
                <div className='d-block d-lg-flex justify-content-between'>
                    {authors.map((author, index) => {
                        return <h6 key={index}>{author}</h6>
                    })}
                </div>
            </footer>
        </Row>
    );
}

export default Footer;