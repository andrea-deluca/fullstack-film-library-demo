import * as Yup from 'yup';

// Helpers
import { getToday } from '../helpers/date';

// Constants
import filmForm from '../constants/filmForm';

const title = filmForm.find(input => {
    return input.name === 'title';
});

const plot = filmForm.find(input => {
    return input.name === 'plot';
});

const FilmSchema = Yup.object().shape({
    title: Yup.string().max(title.max, 'Title too long').required('Required'),
    plot: Yup.string().max(plot.max, 'Too long. Description must be at most 500 characters'),
    image: Yup.string()
        .matches(
            /((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
            'Invalid URL'
        ),
    watchdate: Yup.date().max(getToday(), 'Date must be before now'),
    rating: Yup.string().required('Required')
});

export default FilmSchema;