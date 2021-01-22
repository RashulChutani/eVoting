import React, { Component } from "react";
import { get, post } from "../../utilities";
import Question from "../modules/Question";
import "../../utilities.css";
import "./Profile.css";
import { GoogleLogout }  from "react-google-login";
import NewQuestion from "../modules/NewQuestion";
const GOOGLE_CLIENT_ID = "390849150454-42jkq078ujojn5tpsjmq6ergpmdl17jv.apps.googleusercontent.com";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get('/api/user', { userid: this.props.userId }).then((user) => {
      this.setState({ user: user });
    });
  }

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    else {
      return (
        <>
        <NewQuestion userId = {this.props.userId} />
        <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="Profile-login"
        />
        <div className="Profile-username"> Hello, {this.state.user.name}</div>
        <h1 className="Profile-heading"> My Questions:  <br /> </h1>
        {this.props.questions.reverse().map((question) => (<Question content = {question.content} ans = {question.answer}/>))}
        </>
      );
    }
  }
}

export default Profile;
