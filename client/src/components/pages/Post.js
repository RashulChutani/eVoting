import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Post.css';
// import { get,post } from "../../utilities";
import $ from "jquery";

class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        contentState: {},
      };
    }

    // called whenever the user types in the new post input box
    handleChange = (contentState) => {
      this.setState({
        contentState,
      });
    };
  
    // called when the user hits "Submit" for a new post
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit && this.props.onSubmit(JSON.stringify(this.state.contentState));
      this.setState({
        contentState: {},
      });
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
        image: { uploadCallback: this.uploadCallback,
                 previewImage: true
            }
      }
        if(!this.props.userId){
            window.location.href = "/";
        }
      return (
        <div>
          <div className="Post-prompt" >
            Please enter your question in the space below.
            You can also upload images and code snippets. 
            Get answered in as less as 30 mins!
            Please click the <img className="Post-img" src = "https://i.ibb.co/vmkKwfS/img.png"/> button to upload an image!
          </div>
          <Editor 
            wrapperClassName="Post-input"
            onContentStateChange={this.handleChange}
            toolbar={ config }
          />
          <br />
          <button
          type="submit"
          className="Post-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}>
          Submit
          </button>
        </div>
      );
    }
  }

  export default Post;  