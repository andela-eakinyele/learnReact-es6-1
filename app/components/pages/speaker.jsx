'use strict';

import React from 'react';
import Display from './../shared/display.jsx';
import JoinSpeaker from './join-speaker.jsx';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Speaker';
  }

  render() {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.title === 'Untitled Presentation'}>
            <h2>Start the Presentation</h2>
            <JoinSpeaker emit={this.props.emit} />
          </Display>
          <Display if={this.props.title !== 'Untitled Presentation'}>
            <h2>Presentation Started</h2>
          </Display>
        </Display>
      </div>
      );
  }
}

export default Speaker;
