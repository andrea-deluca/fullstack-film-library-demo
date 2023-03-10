import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default LoginSchema;

