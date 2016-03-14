'use strict';

import React from 'react';
import { BarChart } from 'react-d3';
import Display from './../shared/display.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Board';
    this.barGraphData = this.barGraphData.bind(this);
  }

  barGraphData(results) {
    var data = {
      name: 'Reponse'
    };
    data.values = Object.keys(results).map((choice) => {
      return {
        'x': choice,
        'y': results[choice]
      };
    });
    return new Array(data);
  }

  render() {
    return (
      <div id="scoreboard">
          <Display if={this.props.status === 'connected' && this.props.currentQuestion.q}>
            <BarChart data={this.barGraphData(this.props.results)}
      title={this.props.currentQuestion.q}
      height={window.innerHeight * 0.6}
      width={window.innerWidth * 0.9}>
            </BarChart>
          </Display>
          <Display if={this.props.status === 'connected' && !this.props.currentQuestion.q}>
            <h3>Awaiting a question...</h3>
          </Display>
        </div>
      );
  }
}

export default Board;
