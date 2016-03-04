'use strict';

import React from 'react';
import io from 'socket.io-client';
import {RouterHandler} from 'react-router';

import Head from './shared/header.jsx';

class App extends React . Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      status: 'disconnected',
      title: ''
    }

    this.connect = this.connect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', this.connect);
    this.socket.on('welcome', this.welcome);
  }

  connect() {
    this.setState({
      status: 'connected'
    });
  }

  welcome(serverState) {
    this.setState({
      title: serverState.title
    });
  }

  render() {
    return (
      <div className="container">
        <Head title={this.state.title} />
        <div className="content">
          {this.props.children}
        </div>
      </div>
      );
  }
}

export default App;