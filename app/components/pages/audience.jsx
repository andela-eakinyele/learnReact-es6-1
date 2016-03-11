'use strict';

import React from 'react';
import Display from './../shared/display.jsx';
import Join from './../pages/join.jsx';

class Audience extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Audience';
  }

  render() {
    return (
      <div>
          <Display if={this.props.status === 'connected'}>
            <Display if={this.props.member.name}>
              <h1>Joined the Presentation</h1>
              <h2>Welcome : {this.props.member.name}</h2>
              <p>Audience connected : {this.props.audience.length}</p>
              <p> Questions will appear here</p>
            </Display>
            <Display if={!this.props.member.name}>
              <h1>Join the Session</h1>
              <Join title= {this.props.title} emit={this.props.emit} />
            </Display>
          </Display>
      </div>
      );
  }
}

export default Audience;
