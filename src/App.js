import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import AddService from "./addservice";
import EditService from "./editservice";
function App() {
  return (
    <Router>
    <div className="App">
    <Route exact path = "/" component={Login} />
      <Route path = "/home" component={Home} />
      <Route path = "/add" component={AddService} />
      <Route path = "/edit/:id" component={EditService} />


    </div></Router>
  );
}

export default App;
