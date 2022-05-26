const filmForm = [
    {
        id: 'add-film-title',
        label: 'Title',
        name: 'title',
        type: 'text',
        placeholder: 'Insert a film title',
        max: 32
    },
    {
        id: 'add-film-description',
        label: 'Plot',
        name: 'plot',
        type: 'text',
        as: 'textarea',
        rows: 4,
        placeholder: 'Write a short plot...',
        max: 500
    },
    {
        id: 'add-film-image',
        label: 'URL Image',
        name: 'image',
        type: 'text',
        placeholder: "Insert the URL of an image for the cover"
    },
    {
        id: 'add-film-favorite',
        label: 'Favorite',
        name: 'favorite',
        type: 'checkbox'
    },
    {
        id: 'add-film-watchdate-switch',
        label: 'Have you ever seen this film?',
        name: 'watchDateSwitch',
        type: 'checkbox'
    },
    {
        id: 'add-film-watchdate',
        label: 'Watch date',
        name: 'watchdate',
        type: 'date'
    },
    {
        id: 'add-film-score',
        label: 'Score',
        name: 'rating',
        as: 'select',
        options: [
            { value: '', label: 'Choose a score...' },
            { value: '0', label: 'Zero (0)' },
            { value: '1', label: 'One (1)' },
            { value: '2', label: 'Two (2)' },
            { value: '3', label: 'Three (3)' },
            { value: '4', label: 'Four (4)' },
            { value: '5', label: 'Five (5)' },
        ],
    },
];

export default filmForm;