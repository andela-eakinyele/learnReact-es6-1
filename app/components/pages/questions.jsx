import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Questions';
    this.addQuestion = this.addQuestion.bind(this);
    this.ask = this.ask.bind(this);
  }

  ask(question) {
    this.props.emit('ask', question);
  }

  addQuestion(question, index) {
    return (
      <div key={index} className="col-xs-12 col-sm-6 col-md-3">
        <span onClick={this.ask.bind(null, question)}>{question.q}</span>
      </div>
      );
  }

  render() {
    return (
      <div id="questions" className="row">
        <h2>Questions</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
      );
  }
}

export default Questions;
