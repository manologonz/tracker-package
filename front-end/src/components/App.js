// React, Redux, Router, Alert
import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
// Components
import Home from "./pages/home/Home";
import Header from "./layout/Header";
import Login from "./pages/accounts/Login";
import Register from "./pages/accounts/Register";
import store from "./store";
import { loadUser } from "./actions/auth";
import Alerts from "./layout/Alerts";
import Packages from "./pages/packages/Packages";
import AdminPackages from "./pages/packages/AdminPackages";
import ClientCatalogues from "./pages/catalogues/ClientCatalogues";
import Catalogue from "./pages/catalogues/Catalogue";
import UserInfo from "./pages/accounts/UserInfo";
import CreateUserAdmin from "./pages/accounts/CreateUserAdmin";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={UserInfo} />
            <Route exact path="/packages" component={Packages} />
            <Route exact path="/packages-admin" component={AdminPackages} />
            <Route exact path="/admin-create" component={CreateUserAdmin} />
            <Route exact path="/catalogues" component={ClientCatalogues} />
            <Route exact path="/catalogue-edit" component={Catalogue} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const mount_point = document.getElementById("app");
render(<App />, mount_point);

export default App;
