import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Display';
  }
  render() {
    return (this.props.if) ? <div>{this.props.children}</div> : null;
  }
}

export default Display;
