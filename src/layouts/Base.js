import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Main from '../components/Main.js';
import Login from '../components/Login.js';

function BaseLayout(props){
  return(
    <Router>
        <main className='container'>
          <Route path='/' exact component={Login} />
          <Route path='/home' exact component={Main} />
        </main>
    </Router>
);
}

export default BaseLayout;
