import React, { Component } from "react";
import "./NewQuestion.css";

class NewQuestion extends Component{
    constructor(props) {
        super(props);
    }

    postIt = (event) => {
        window.location.href = "/post/"+this.props.userId;
    };
    
    render() {
        return (
            <>
            <center>
            <button className="large red button button-class" onClick= {this.postIt}><span className="NewQuestion-button">Post a Question</span></button>
            </center>
            </>
        );
    }
}  

export default NewQuestion;