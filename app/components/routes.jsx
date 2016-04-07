'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Audience from './pages/audience.jsx';
import Speaker from './pages/speaker.jsx';
import Board from './pages/board.jsx';
import Oops404 from './pages/Oops404.jsx';
import App from './app.jsx';

var routes = (
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Audience} />
    <Route path="/speaker" component={Speaker} />
    <Route path="/board" component={Board} />
    <Route path="*" component={Oops404} />
  </Route>
</Router>
);

render(routes, document.getElementById('app'));

