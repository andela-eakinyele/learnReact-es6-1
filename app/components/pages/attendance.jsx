import React from 'react';

class Attendance extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Attendance';
    this.addMemberRow = this.addMemberRow.bind(this);
  }

  addMemberRow(member, index) {
    return (
      <tr key={index}>
        <td>{member.name}</td>
        <td>{member.id}</td>
      </tr>
      );
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
            </tr>
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
