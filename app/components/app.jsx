'use strict';

import React from 'react';
import cloneWithProps from 'react-addons-clone-with-props';
import io from 'socket.io-client';
import { RouterHandler } from 'react-router';

import Head from './shared/header.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.displayName = 'App';
    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: false,
      results: {}
    }

    this.emit = this.emit.bind(this);

    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {

      this.setState({
        status: 'connected'
      });

      var member = sessionStorage.member ? JSON.parse(sessionStorage.member) : null;
      if (member && member.type === 'audience') {
        this.emit('join', member);
      } else if (member && member.type === 'speaker') {
        this.emit('start', {
          name: member.name,
          title: sessionStorage.title
        });
      }
    });

    this.socket.on('disconnect', () => {
      this.setState({
        status: 'disconnected',
        title: 'disconnected',
        speaker: ''
      });
    });

    this.socket.on('welcome', x => this.setState(x));

    this.socket.on('start', presentation => {
      if (this.state.member.type === 'speaker') {
        sessionStorage.title = presentation.title;
      }
      this.setState(presentation);
    });

    this.socket.on('end', x => this.setState(x));

    this.socket.on('joined', member => {
      sessionStorage.member = JSON.stringify(member);
      this.setState({
        member: member
      });
    });

    this.socket.on('audience', newAudience => {
      this.setState({
        audience: newAudience
      });
    });

    this.socket.on('ask', question => {
      sessionStorage.answer = '';
      this.setState({
        currentQuestion: question,
        results: {
          'a': 0,
          'b': 0,
          'c': 0,
          'd': 0
        }
      });
    });

    this.socket.on('results', data => {
      this.setState({
        results: data
      });
    });
  }

  emit(eventName, payLoad) {
    this.socket.emit(eventName, payLoad);
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