import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import FilmList from './components/FilmList';
import Auth from './containers/Auth/Auth';  
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.onMountAutoSignup();
  }

  render() {

    let routes =  (
      <Switch>
        <Route path="/" exact component={FilmList} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    )

    return (
        <Layout>
          {routes}
        </Layout>
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