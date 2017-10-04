import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Main from '../components/Main.js';
import Login from '../components/Login.js';
import authRequired from '../components/Authentification.js';

function BaseLayout(props){
  return(

    <Router>
      <Switch>
        <main>
          <Route path='/weekly-11-bakers/' exact component={Login} />
          <Route path='/weekly-11-bakers/home' exact component={authRequired(Main)} />
          <Redirect to="/weekly-11-bakers/" />
        </main>
      </Switch>
    </Router>

);
}

export default BaseLayout;
