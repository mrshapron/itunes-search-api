import React from "react";
import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MediaSearcher from "./Components/MediaSearcher";
import About from "./Components/About";
import ItemDetail from "./Components/ItemDetail";
import Topten from "./Components/Topten";

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Nav />
          <div className="body-content">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/topten" component={Topten} />
              <Route path="/search" exact component={MediaSearcher} />
              <Route path="/search/:id" component={ItemDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
