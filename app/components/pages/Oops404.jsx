'use strict';

import React from 'react';
import { Link } from 'react-router';

class Oops404 extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Oops404';
  }

  render() {
    return (
      <div>
        <h1>Whoops...</h1>
        <p>Page not found</p>
        <Link to="/">Home</Link>
        <Link to="/speaker">Speaker</Link>
        <Link to="/board">Board</Link>
      </div>
      );
  }
}

export default Oops404;
