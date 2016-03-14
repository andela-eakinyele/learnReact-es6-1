import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Display from './../shared/display.jsx';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Join';
    this.join = this.join.bind(this);
  }

  join() {
    var memberName = ReactDOM.findDOMNode(this.refs.name).value;
    this.props.emit('join', {
      name: memberName
    });
  }

  render() {
    return (
      <form action="javascipt:void(0)" onSubmit={this.join}>
        <label> Enter your FullName</label>
        <input ref="name" className="form-control" placeholder="Full Name" required />
        <button className="btn btn-primary">Join</button>
        <Display if={this.props.title === 'Untitled Presentation'}>
          <Link to="/speaker">Start the Presentation</Link>
          <Link to="/board">Go to the board</Link>
        </Display>
      </form>
      );
  }
}

export default Join;
