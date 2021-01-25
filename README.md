## Setup

### 1.Make sure you have node.js installed

You can download it [here](https://nodejs.org/en/download/)

### 2.Open a terminal in the server directory and run following commands

1. "npm install" <- it will install all necessary packages for running the project
2. "node index.js" <- if you see a "connected to database" log then we are ready for step 3
3. terminate current process and run "npm test" to test out the connection and make sure requests are working fine
4. if all of the tests were passed terminate process and run "npm run dev" and if you see a "Server running on port 3000" and "Connected to database" messages then we are set up and ready to start client side

### 3.Open a terminal in the client directory and run following commands

1. "npm install" <- it will install all necessary packages for running the project
2. "npm start" <-it will start a react project and open in at [http://localhost:5000](http://localhost:5000)

### If everything worked correctly then you should see an interface with the "Notes CRUD app" ;)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
