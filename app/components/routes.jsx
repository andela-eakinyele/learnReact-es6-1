'use strict';

import React from 'react'; 
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Audience from './audience.jsx';
import Speaker from './speaker.jsx';
import Board from './board.jsx';
import App from './app.jsx';

var routes = (
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Audience} />
    <Route name="speaker" path="/speaker" component={Speaker} />
    <Route name="board" path="/board" component={Board} />
  </Route>
</Router>
  );

  render(routes , document.getElementById('app'));

