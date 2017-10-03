import React, { Component } from 'react';
import '../styles/App.css';

import BaseLayout from '../layouts/Base.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BaseLayout />
      </div>
    );
  }
}

export default App;
