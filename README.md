This project has been developed by team described below for the course of "Applicazioni Web I", attended during the academic year 2021/22 at Politecnico di Torino, Master's Degree in Computer Engineering.

## Team members

- ANDRIANO DAVIDE
- BELARDO ANNA LISA
- DELUCA ANDREA
- TAMBURO LUCA

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but please double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email                 | password | name     |
| --------------------- | -------- | -------- |
| john.doe@polito.it    | password | John     |
| mario.rossi@polito.it | password | Mario    |
| testuser@polito.it    | password | Testuser |

## List of APIs offered by the server

Provide a short description of the API you designed, with the required parameters. Please follow the proposed structure.

- [HTTP Method] [URL, with any parameter]
- [One-line about what this API is doing]
- [A (small) sample request, with body (if any)]
- [A (small) sample response, with body (if any)]
- [Error responses, if any]

### APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### **List Films**

#### `POST /api/sessions`

Performs user authentication and create a new session for the user.

##### **Request header:**

`Content-Type: application/json`

##### **Request body:**

A JSON object containing username and password.

```
{
    "username": "testuser@polito.it",
    "password": "password"
}
```

##### **Response body**

`HTTP status code 200 OK`

```
{
    "id": "3",
    "email": "testuser@polito.it",
    "name": "Testuser",
}
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 401 Unauthorized` (credentials error)

#### `DELETE /api/sessions/current`

Performs user logout and delete the current user session.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)

#### `GET /api/sessions/current`

Gets information about the user, if he is logged in.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

```
{
    "id": "3",
    "email": "testuser@polito.it",
    "name": "Testuser",
}
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (user not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/all`

Gets all films associated with the logged in user.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### Response body

`HTTP status code 200 OK`

```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "plot": "Un killer si innamora della moglie del suo capo...",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "image": "https://images.unsplash.com/...",
        "user": "1"
    },
    {
        "id": "2",
        "title": "Batman",
        "plot": "Dal celebre fumetto, le avventurose vicende...",
        "favorite": "1",
        "watchdate": "2022-04-30",
        "rating": "3",
        "image": "https://images.unsplash.com/...",
        "user": "1"
    },

    ...
]
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (films not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/favorite`

Gets all favorite films associated with the logged in user.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### Response body

`HTTP status code 200 OK`

```
[
    {
        "id": "7",
        "title": "Spiderman",
        "plot": "Il morso di un ragno mutante dona...",
        "favorite": "1",
        "watchdate": "2016-02-17",
        "rating": "3",
        "https://images.unsplash.com/...",
        "user": "3"
    },

    {
        "id": "8",
        "title": "Iron Man",
        "plot": "Dopo essere sopravvissuto ad un attacco...",
        "favorite": "1",
        "watchdate": "2010-07-22",
        "rating": "5",
        "image": "https://images.unsplash.com/...",
        "user": "3"
    },

    ...
]
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (films not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/best-rated`

Gets all best rated films associated with the logged in user.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### Response body

`HTTP status code 200 OK`

```
[
      {
        "id": "1",
        "title": "Pulp Fiction",
        "plot": "Un killer si innamora della moglie del suo capo...",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "image": "https://images.unsplash.com/...",
        "user": "1"
    },

    ...
]
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (films not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/seen-last-month`

Gets all films seen last month by the logged in user.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### Response body

`HTTP status code 200 OK`

```
[
      {
        "id": "3",
        "title": "Star Wars",
        "plot": "Con l'aiuto di robot e altri alleati...",
        "favorite": "0",
        "watchdate": "2022-05-25",
        "rating": "0",
        "image": "https://images.unsplash.com/...",
        "user": "1"
    },

    ...
]
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (films not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/unseen`

Gets all films unseen by the logged in user.

##### Response body

`HTTP status code 200 OK`

```
[
    {
        "id": "4",
        "title": "Matrix",
        "plot": "Esistono due realtà: una è l'esistenza...",
        "favorite": "0",
        "watchdate": null,
        "rating": "5",
        "image": "https://images.unsplash.com/...",
        "user": "2"
    },

    ...
]
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (films not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `GET /api/films/:id`

Returns a film associated with the logged in user, given the film id.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Params: req.params.id to retrieve film id`

##### Response body

`HTTP status code 200 OK`

```
{
    "id": "1",
    "title": "Pulp Fiction",
    "plot": "Un killer si innamora della moglie del suo capo...",
    "favorite": "1",
    "watchdate": "2022-03-11",
    "rating": "5",
    "image": "https://images.unsplash.com/...",
    "user": "1"
}
```

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (film not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `POST /api/films/add-film`

Creates a new film associated with the logged in user.

_Just the title and a rating from 0 to 5 are not optional._

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Content-Type: application/json`

##### **Request body:**

A JSON object containing the data of the film to insert.

```
{
    "title": "New film to insert",
    "plot": "Plot of the film...",
    "favorite": "1",
    "watchdate": "2022-03-11",
    "rating": "5",
    "image": "https://images.unsplash.com/...",
    "user": "1"
}
```

#### Response body

`HTTP status code 200 OK`

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `PUT api/films/update-film/:id`

Edits a film associated with the logged in user, given the film id.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Params: req.params.id to retrieve film id`

##### Response body

`HTTP status code 200 OK`

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 404 Not Found` (film not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `PUT api/films/update-favorite/:id`

Sets or unsets the favorite status for a film asoociated with the logged in user, given the film id.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Params: req.params.id to retrieve film id`

##### **Request body:**

A JSON object containing the new status for the favorite flag.

```
{
    "favorite": "1"
}
```

##### Response body

`HTTP status code 200 OK`

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 404 Not Found` (film not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `PUT api/films/update-rating/:id`

Changes the rating of a film associated with the logged in user, given the film id.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Params: req.params.id to retrieve film id`

##### **Request body:**

A JSON object containing the new rating for the film.

```
{
    "rating": "4"
}
```

##### Response body

`HTTP status code 200 OK`

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 404 Not Found` (film not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `DELETE /api/delete-film/:id`

Delete a film associated with the logged in user, given the film id.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`
`Params: req.params.id to retrieve film id`

##### Response body

`HTTP status code 200 OK`

##### Error responses

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (film not found error)
- `HTTP status code 401 Unauthorized` (authentication error)
