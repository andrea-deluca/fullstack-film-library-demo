import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = (props) => {
    return (
        <Form className={props.className}>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="dark" className='text-white'>Search</Button>
        </Form>
    );
}

export default SearchBar;