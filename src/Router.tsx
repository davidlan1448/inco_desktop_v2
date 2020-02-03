import React, { Fragment, lazy, Component } from "react";
import { BrowserRouter, Route, HashRouter, Redirect } from "react-router-dom";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";

import { connect } from "react-redux";

import { getUserLogged, logout } from "./redux/actions/userActions";
import { User } from "./electron/entitys/User";
import { Navbar } from "./components/NavBar";

const PrivateRoute = ({ component: Component, user, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      user ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class Router extends Component<any> {
  componentDidMount() {
    const { getUserLogged } = this.props;
    getUserLogged();
  }

  render() {
    const {
      userReducer: { user, loadingUserLogged, isLoggued },
      logout
    } = this.props;
    const userLogged: User = user;

    return loadingUserLogged ? (
      <p></p>
    ) : (
      <HashRouter>
        {this.props.children}

        <Navbar isLoggued={ isLoggued } logout={logout} >
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} user={userLogged} />
          <PrivateRoute exact path="/product/:idInventory" component={Product} user={userLogged} />
        </Navbar>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ userReducer }: any) => {
  return {
    userReducer
  };
};

const mapDispathToProps = {
  getUserLogged,
  logout
};

export default connect(mapStateToProps, mapDispathToProps)(Router);
