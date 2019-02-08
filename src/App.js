import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Logout from './containers/Auth/Logout/Logout';
import NavBar from './components/NavBar';
import FilmList from './components/FilmList';
import Auth from './containers/Auth/Auth';  
import * as actions from './store/actions/index';


class App extends Component {

  state = {
    freshReload: false
  }

  componentDidMount() {
    this.props.onMountAutoSignup();
  }

  render() {
    return (
      <>
          <NavBar />

          <Switch>
            <Route path="/" exact component={FilmList} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Redirect to="/" />
          </Switch>

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onMountAutoSignup: () => dispatch( actions.authCheckState() ),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));