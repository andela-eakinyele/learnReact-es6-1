import React from 'react';

class Attendance extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Attendance';
    this.addMemberRow = this.addMemberRow.bind(this);
  }

addMemberRow(){

}

  render() {
    return (
      <div>
        <h2>Attendance - {this.props.audience.length} members</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Audience Member</th>
              <th>SocketID</th>
          </thead>
          <tbody>
            {this.props.audience.map(this.addMemberRow)}
          </tbody>
        </table>
      </div>
      );
  }
}

export default Attendance;
