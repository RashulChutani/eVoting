import React, { Component } from "react";

import "../../utilities.css";
import "./Question.css";
import draftToHtml from 'draftjs-to-html';

import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { get,post } from "../../utilities";
import $ from "jquery";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
        question: props.content,
        contentState: {},
    };
  }

//   componentDidMount() {
//     this.setState({
//       question: this.props.content,
//       contentState: {},
//     });
//   }
  
    // called whenever the user types in the new post input box
    handleChange = (contentState) => {
        this.setState({
          contentState,
        });
      };
    
      // called when the user hits "Submit" for a new post
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.props.qid,JSON.stringify(this.state.contentState));
      };
  
      uploadCallback(file) {
        return new Promise(
          (resolve,reject) => {
            var form = new FormData();
            form.append("image", file);
            var settings = {
              "url": "https://api.imgbb.com/1/upload?key=7fca2c513ced383992822e2fcf2d68bf",
              "method": "POST",
              "timeout": 0,
              "processData": false,
              "mimeType": "multipart/form-data",
              "contentType": false,
              "data": form
            };
            let x = $.ajax(settings).done(function (response) {
              console.log(response);
              var jx = JSON.parse(response);
              console.log(jx.data.url); 
              response = { data: { link: jx.data.url }};
              resolve(response);
            });
          }
        )
      }
  render() {
    const config={
        image: { 
                uploadCallback: this.uploadCallback,
                previewImage: true,  
            }
      }
    return (
        <>
        <div className="Question-appearance">
            <b>Question: </b>
        <div dangerouslySetInnerHTML={{__html: (draftToHtml(JSON.parse(this.state.question))) }} />
        </div>
        <Editor onContentStateChange={this.handleChange} toolbar={ config } />
        <button
        type="submit"
        className="Post-button u-pointer"
        value="Submit"
        onClick={this.handleSubmit}>
            Submit
        </button>
        </>
    );

  }
}

export default Question;
