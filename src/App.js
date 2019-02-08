import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Logout from './containers/Auth/Logout/Logout';
import NavBar from './components/NavBar';
import FilmList from './components/FilmList';
import Auth from './containers/Auth/Auth';  
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.onMountAutoSignup();
  }

  render() {
    return (
      <>
          <NavBar />

          {
             this.props.isAuthenticated ? (
          <Switch>
            <Route path="/" exact component={FilmList} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Redirect to="/" />
          </Switch>
            )
          :null} 
          
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

export default connect(mapStateToProps, mapDispatchToProps)(App);