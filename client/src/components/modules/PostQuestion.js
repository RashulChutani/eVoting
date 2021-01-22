import React, { Component } from "react";
import "./PostQuestion.css";
import GoogleLogin from "react-google-login";
import { Button } from 'semantic-ui-react';
import { Editor } from 'react-draft-wysiwyg';
import $ from "jquery";


const GOOGLE_CLIENT_ID = "390849150454-42jkq078ujojn5tpsjmq6ergpmdl17jv.apps.googleusercontent.com";

class PostQuestion extends Component{
    constructor(props) {
        super(props);
    }

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
        };
        return (
        <>
        <center>
            <Editor 
              wrapperClassName="PostQuestion-input"
              onContentStateChange={this.props.handleChange}
              toolbar={ config }
            /><br />
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={renderProps => (
                    <Button color='orange' size="large" className="PostQuestion-button" primary onClick={renderProps.onClick} disabled={renderProps.disabled}>Post a Question</Button>
              )}
              buttonText="Post a Question"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />  
        </center>
        </>
        );
    }
}

export default PostQuestion;