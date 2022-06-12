# Client README

## Instructions

Ignore the client folder during the first week. Focus only on the server implementation.

From week 2, fill this folder with the outcome of BigLab1. If you did not submitted BigLab1 or you had problems with that, you can also start from our proposed solution when it will be available.

# Table of Contents

1. [Documentation](#documentation)
    - [Source Directory Structure](#source-directory-structure)
    - [Available Routes](#available-routes)
2. [Getting Started with Create React App](#getting-started-with-create-react-app)
    - [Available Scripts](#available-scripts)
    - [Learn More](#learn-more)

# Documentation

Here you can find some useful information about this project.


## Source Directory Structure

Here you can find a visual schema of source directory structure by means the tree chart below and a short description for each folder.

```
|--- /src
     |--- /components (It containes all components used)
     |    |--- /AppContainer.jsx
     |    |--- /ConfirmationModal.jsx
     |    |--- /FilmCard.jsx
     |    |--- /FilmForm.jsx
     |    |--- /FilteredLibrary.jsx
     |    |--- /Footer.jsx
     |    |--- /Input.jsx
     |    |--- /LoginForm.jsx
     |    |--- /Navbar.jsx
     |    |--- /ProtectedRoute.jsx
     |    |--- /SearchBar.jsx
     |    |--- /Sidebar.jsx
     |
     |--- /constants (It contains all constants used)
     |    |--- /authors.js
     |    |--- /filmForm.js
     |    |--- /filters.js
     |
     |--- /helpers (It contains helper functions)
     |    |--- /date.js
     |
     |--- /hooks (It contains all custom hooks used)
     |    |--- /useModal.js
     |    |--- /useNotification.js
     |
     |--- /style (It contains custom style rules)
     |    |--- /_app.scss
     |    |--- /_bootstrap.scss
     |    |--- /_card.scss
     |    |--- /_colors.scss
     |    |--- /_sidebar.scss
     |    |--- /index.scss
     |
     |--- /services (It contains all APIs)
     |    |--- /api.js
     |
     |--- /validations (It contains all validation schemas)
     |    |--- /FilmSchema.js
     |    |--- /LoginSchema.js
     |
     |--- /views (It contains all pages of the application)
     |    | --- /index.js
     |    | --- /AddFilm.jsx
     |    | --- /ErrorView.jsx
     |    | --- /Home.jsx
     |    | --- /Library.jsx
     |    | --- /UpdateFilm.jsx
     |
     |--- /App.jsx
     |--- /index.js
```

## Available Routes

All routes available are listed below.

### `/`

Index route where you can find the login form. Just this route is unprotected 
from the user authentication. Moreover, it is unreachable when the user is logged in.

### `/filter/:filter`

**This route is protected. The user must be authenticated to navigate here.**

A route is generated for each filter available. In particular, you can navigate between the following filter routes:

```
--- Filter routes ---

/filter/all
/filter/favorites
/filter/best-rated
/filter/seen-last-month
/filter/unseen
```

### `/add-film`

**This route is protected. The user must be authenticated to navigate here.**

You can navigate to the form to add a film through this route.

### `/update-film/:id`

**This route is protected. The user must be authenticated to navigate here.**

A route to the form to update film informations is generated for each film, using his id. Moreover, the form is filled in with the information about the film saved up to that point.

### `/*`

Any other route is matched by this one where the application shows a page not found error.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
