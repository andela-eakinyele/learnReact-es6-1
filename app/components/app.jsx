'use strict';

import React from 'react';
import cloneWithProps from 'react-addons-clone-with-props';
import io from 'socket.io-client';
import { RouterHandler } from 'react-router';

import Head from './shared/header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: ''
    }

    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.updateState = this.updateState.bind(this);
    this.joined = this.joined.bind(this);
    this.start = this.start.bind(this);
    this.updateAudience = this.updateAudience.bind(this);

    this.socket = io('http://localhost:5000');

    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
  }

  connect() {
    var member = sessionStorage.member ? JSON.parse(sessionStorage.member) : null;
    if (member && member.type === 'audience') {
      this.emit(member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', {
        name: member.name,
        title: sessionStorage.title
      });
    }

    this.setState({
      status: 'connected'
    });
  }

  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: ''
    });
  }

  updateState(serverState) {
    this.setState(serverState);
  }

  emit(eventName, payLoad) {
    this.socket.emit(eventName, payLoad);
  }

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({
      member: member
    });
  }

  start(presentation) {
    if (presentation.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  }

  updateAudience(newAudience) {
    this.setState({
      audience: newAudience
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child,
        Object.assign({}, {
          ...this.state
        }, {
          emit: this.emit
        }));
    }.bind(this))
  }

  render() {
    return (
      <div className="container">
        <Head {...this.state} />
        <div className="content">
          {this.renderChildren()}
        </div>
      </div>
      );
  }
}

export default App;