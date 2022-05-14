# BigLab 2 - Class: 2022 AW1

## Team name: BYTECODERS

Team members:
* s302094 ANDRIANO DAVIDE
* s302056 BELARDO ANNA LISA
* s303906 DELUCA ANDREA
* s303907 TAMBURO LUCA

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

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |

## List of APIs offered by the server

Provide a short description of the API you designed, with the required parameters. Please follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [A (small) sample request, with body (if any)]
* [A (small) sample response, with body (if any)]
* [Error responses, if any]

### APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Films__

#### `GET /api/films/all`

Gets all films.

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "user": "1"
    },

    {
        "id": "2",
        "title": "21 Grams",
        "favorite": "1",
        "watchdate": "2022-04-30",
        "rating": "4",
        "user": "1"
    },

    ...
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)


#### `GET /api/films/favorite`

Gets all favorite films, so with favorite field equals to 1 whitin the DB.

##### Response body

`HTTP status code 200 OK (success)`

```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "user": "1"
    },

    {
        "id": "2",
        "title": "21 Grams",
        "favorite": "1",
        "watchdate": "2022-04-30",
        "rating": "4",
        "user": "1"
    },

    ...
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)

#### `GET /api/films/best-rated`

Gets all best rated films.

##### Response body

`status 200 OK (success)`
```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "user": "1"
    }
]
```
##### Error responses
- `500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)

#### `GET /api/films/seen-last-month`

Gets all films seen last month.

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "2",
        "title": "21 Grams",
        "favorite": "1",
        "watchdate": "2022-04-30",
        "rating": "4",
        "user": "1"
    }
]
```
##### Error responses
- `500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)

#### `GET /api/films/unseen`

Gets all films unseen.

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "3",
        "title": "Star Wars",
        "favorite": "0",
        "watchdate": "null",
        "rating": "null",
        "user": "1"
    },
    {
        "id": "4",
        "title": "Matrix",
        "favorite": "0",
        "watchdate": "null",
        "rating": "null",
        "user": "2"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)


#### `GET /api/films/:id`

Returns a film, given its id.

##### **Request header:** req.params.id to retrieve id

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id":"1"
        "title": "Pulp Fiction",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "user": "1"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (fields validation error)

#### `POST /api/films/add-film`

Creates a new film

##### **Request header:** has a line: `Content-Type: application/json`

##### **Request body:** a JSON object containing title, favorite, watchdate, rating, user. Id is automatically assigned. 

#### Response body 
`HTTP status code 200 OK` (success)
```
[
    {
        "id": "6",
        "title": " new film title",
        "favorite": "1",
        "watchdate": "2022-03-11",
        "rating": "5",
        "user": "1"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)


#### `PUT api/films/update-film/:id`

Modifies a film, given its id.

##### **Request header:** req.params.id to retrieve id

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "1",
        "title": "Edited Movie",
        "favorite": "0",
        "watchdate": "2022-03-12",
        "rating": "3",
        "user": "1"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no film found error)
- `HTTP status code 422 Unprocessable Entity` (fields validation error)

#### `PUT api/films/update-favorite/:id`

Changes the status of the film if it's favorite or not, given its id.

##### **Request header:** req.params.id to retrieve id

##### **Request body:** a JSON object containing title, favorite, watchdate, rating, user.

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "favorite": "1" (edited field),
        "watchdate": "2022-03-12",
        "rating": "3",
        "user": "1"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no film found error)
- `HTTP status code 422 Unprocessable Entity` (fields validation error)

#### `PUT api/films/update-rating/:id`

Changes the rating of the film , given its id.

##### **Request header:** req.params.id to retrieve id

##### **Request body:** a JSON object containing title, favorite, watchdate, rating, user.

##### Response body

`HTTP status code 200 OK` (success)
```
[
    {
        "id": "1",
        "title": "Pulp Fiction",
        "favorite": "0",
        "watchdate": "2022-03-12",
        "rating": "5" (edited field),
        "user": "1"
    }
]
```
##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no film found error)
- `HTTP status code 422 Unprocessable Entity` (fields validation error)


#### `DELETE /api/delete-film/:id`

Delete a film, given its id.

##### **Request header:** req.params.id to retrieve id

##### Response body

`HTTP status code 200 OK` (success)

##### Error responses
- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (no films found error)
