import React, { Component } from "react";
import QnA from "../modules/QnA";
// import "./Answer.css";

class Answer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
            {this.props.questions.map((question) => (<QnA qid={question._id} content = {question.content} onSubmit={this.props.onSubmit}/>))}
        </>
    )
  }
}

export default Answer;