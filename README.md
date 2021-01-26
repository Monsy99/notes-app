# Setup

## 1.Make sure you have node.js installed

- You can download it [here](https://nodejs.org/en/download/)

- To make sure everything is working run

 `npm -v`

- You should get a message with information about your npm version

## 2. In order to run the project you need to have a local mongoDB

- You can download it [here](https://www.mongodb.com/try/download/community)

- To make sure you properly installed mongodb run:

 `mongo --version`

- It should return a message about your current mongo version

- Open a cmd in the bin directory of the installed folder.
  It might be under "C:\mongodb" or "C:\Program Files\MongoDB\Server\X.X\bin" (Windows)

- Run:

 `mongod.exe --pathname "?path"`

In the pathname argument you can specify a folder to save the db files but it's not necessary

- In order for the app to work correctly don't change the default port on which the mongod is running

- Keep the mongod terminal open for the rest of the time while running the project

## 3.Open a terminal in the "server" directory of the downloaded project and run following commands

- Install packages with

 `npm install`

- To test if the server is working with the setup database run

 `npm test`

- If the tests are passed terminate current process and run

 `node index.js`

- If there is a "connected to database _url_" message then we are ready to CRUD the notes

## 4.Open a terminal in the client directory and run following commands

- Install packages

`npm install`

- Start the client side

 `npm start`

## 5. Usage

### The "client" interface represents all features of the created API

<br>

![Usage](./images/usage_gif.gif)

### Pathnames to CRUD notes with a curl

Server url by default should run on port 3000

 `localhost:3000`

<br>

| Note list    | Note            | Deleted notes  | Note history   |
| ------------ | --------------- | -------------- | -------------- |
| `/api/notes` | `/api/note/:id` | `/api/deleted` | `/history/:id` |

1. get method (read a note/read notes) returns an object with "success" property in response body

   - Returns "success" property that tells us whether we recieved the data

   - If request was fulfilled then under "data" property we get requested object/list

   - If request failed or there is no data, response body "error" property has a message

   - `history/:id` path returns a complete note with additional "history" field that tracks any content changes

<br>

| Create a note |
| ------------- |
| `/api/notes`  |

2. post method (create a note) requires object with "title" and "content"

   - Returns "success" property that tells us whether the note was created

   - Returns "\_id" property

<br>

| Delete a note   |
| --------------- |
| `/api/note/:id` |

3. delete method (delete a note)

   - Returns "success" property that tells us whether the note was deleted

   - Returns "\_id" property in case you want to see a `history`

<br>

| Update a note   |
| --------------- |
| `/api/note/:id` |

4. put method (update a note) requires a body with "content", "title" is optional

   - Returns "success" property that tells us whether the note was updated

   - Returns "\_id" property
