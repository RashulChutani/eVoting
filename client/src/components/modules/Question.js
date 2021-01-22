import React, { Component } from "react";

import "../../utilities.css";
import "./Question.css";
const MY_QUESTION = "Hello What is your name?";
import draftToHtml from 'draftjs-to-html';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
        question: MY_QUESTION,
        answer: "",
    };
  }

  componentDidMount() {
    let ans = this.props.ans;
    this.setState({
      question: this.props.content,
      answer: ans,
    });
  }

  render() {
    if(this.state.answer != ""){
      return (
      <div className="Card-appearance">
          <div className="Question-appearance">
              <b>Question: </b>
          <div className = "Question-width" dangerouslySetInnerHTML={{__html: (draftToHtml(JSON.parse(this.state.question))) }} />
          </div>
          <div className="Question-appearance">
              <b>Answer: </b>
              <div className = "Question-width" dangerouslySetInnerHTML={{__html: (draftToHtml(JSON.parse(this.state.answer))) }} />
          </div>
        </div>
      );
    }
    return (
      <>
        <div id="quest" className="Card-appearance">
          <div className="Question-appearance">
          <b>Question: </b>
            <div dangerouslySetInnerHTML={{__html: (draftToHtml(JSON.parse(this.props.content))) }} />    
          </div>
          <p className="Question-appearance">
          <b>Answer: </b>
              Not Answered Yet!
          </p>
        </div>
      );
      </> 
    );
  }
}

export default Question;
