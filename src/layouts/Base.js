import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Main from '../components/Main.js';
import Login from '../components/Login.js';
import authRequired from '../components/Authentification.js';

function BaseLayout(props){
  return(
    <Router>
        <main>
          <Route path='/' exact component={Login} />
          <Route path='/home' exact component={authRequired(Main)} />
        </main>
    </Router>
);
}

export default BaseLayout;
