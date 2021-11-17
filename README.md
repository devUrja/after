# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# What this project is about ?

This project fetches posts from a public API in batch request and displays the various details of the posts.
The API is called at an interval of 10 seconds fetching the posts of the next set every time and the current fetched posts is appended
to the existing posts.

This project utilizes the following API:

- Get Posts https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}

### Visual Insights

As the application starts , the first API call is made fetching the posts at page = 0 , and at an interval of every 10 seconds the following
set of posts are fetched.The details of the posts are displayed in a tabular format.

Besides calling the API on an interval , whenever the page is scrolled till the end ,an API call is made fetching next set of posts.

Both , the interval API calls as well as the API call made on reaching the end of page , work simultaneously but no API call is made with same page number twice.Hence we get the unique posts in the table.

The API response return a bunch of details regarding each post , but we are only interested in the following set of details:

```
{
  "title": string,
  "author": string,
  "url": string,
  "created_at":string
}
```

Upon clicking on any row in the table , the details of the particular post appear in a modal popup.

Also there is a textbox for searching any post based on the title , author or url.

There is a filtering option based on the title , and the created date of the post.

### Packages used

| Name                        |    Version     | Purpose                                                  |
| :-------------------------- | :------------: | :------------------------------------------------------- |
| @material-ui/core           |     4.12.3     | For styling Application                                  |
| @material-ui/icons          |     4.11.2     | To display icons provided by material UI                 |
| @material-ui/lab            | 4.0.0-alpha.60 | Provides extra material UI components                    |
| axios                       |     0.21.1     | For Data Fetching / HTTP requests                        |
| prettier                    |     2.3.2      | For consistent prettified code across different platform |
| react-toastify              |     7.0.4      | To display toast in application                          |
| react-intersection-observer |     8.32.0     | To tell when an element enters or leaves the viewport    |

## Available Scripts

In the project directory, you can run:

In the project directory, you can run:

### `yarn run prettier`

Runs [prettier](https://prettier.io/docs/en/install.html) development package that formats code as configured in prettierrc.json.~

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
