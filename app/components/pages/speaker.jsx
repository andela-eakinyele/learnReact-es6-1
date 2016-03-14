'use strict';

import React from 'react';
import Display from './../shared/display.jsx';
import JoinSpeaker from './join-speaker.jsx';
import Attendance from './attendance.jsx';
import Questions from './questions.jsx';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Speaker';
  }

  render() {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
            <Questions questions={this.props.questions} emit={this.props.emit} />
            <Attendance audience={this.props.audience} />
          </Display>

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
