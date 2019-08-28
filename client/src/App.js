import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";

import { Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from 'react-router'
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import "bootstrap/dist/css/bootstrap.min.css";

// Scenes
import Home from "./scenes/Home";
import Error404 from "./scenes/Error404";
import Trading from "./scenes/Trading";

export const history = createBrowserHistory();

const { store, persistor } = configureStore();

class App extends Component {
  state = {
    currentLink: ''
  };

  componentDidUpdate() {
    var currentLink = window.location.href.split("/");
    currentLink = currentLink[currentLink.length - 1];
    this.setState({ currentLink });
    console.log(currentLink);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Router history={history}>
              <AppNavbar currentLink={window.location.pathname} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/trading" component={Trading} />
                <Route exact path="*" component={Error404} />
              </Switch>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
