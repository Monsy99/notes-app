import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Nav from "./Components/NavBar";
import Notes from "./features/Notes";
import Note from "./features/Note";
import DeletedNotes from "./features/DeletedNotes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/history/:id">
          {/*This route allows user to fetch any note, including deleted*/}
          <Nav></Nav>
          <Note historical={true}></Note>
        </Route>
        <Route path="/history">
          {/*This route fetches and displays all deleted notes*/}
          <Nav></Nav>
          <DeletedNotes></DeletedNotes>
        </Route>
        <Route path="/note/:id">
          {/*This route fetches and displays a single note. Deleted note returns 404*/}
          <Nav></Nav>
          <Note></Note>
        </Route>
        <Route path="/notes">
          {/*This route fetches and displays all notes that are not deleted*/}
          <Nav></Nav>
          <Notes></Notes>
        </Route>
        <Route path="/">
          <Redirect to="/notes"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
