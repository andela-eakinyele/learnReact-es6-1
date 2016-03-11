import React from 'react';
import ReactDOM from 'react-dom';

class JoinSpeaker extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'JoinSpeaker';
    this.start = this.start.bind(this);
  }

  start() {
    var speakerName = ReactDOM.findDOMNode(this.refs.name).value;
    var presentationTitle = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start', {
      name: speakerName,
      title: presentationTitle
    });
  }

  render() {
    return (
      <form action="javascipt:void(0)" onSubmit={this.start}>
        <label> Enter your FullName</label>
        <input ref="name" className="form-control" placeholder="Full Name" required />
        <label> Presentation Title</label>
        <input ref="title" className="form-control" placeholder="Enter a title for Presentation" required />
        <button className="btn btn-primary">Join</button>
      </form>
      );
  }
}

export default JoinSpeaker;
