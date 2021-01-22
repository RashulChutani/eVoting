import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import Vote from "./pages/Vote"
import Admin from "./pages/Admin"
import { get, post } from "../utilities";
import Results from "./pages/Results"
import "../utilities.css";
import "./App.css";

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      hasStarted: false,
      voted: false,
      votes: [],
      candidateList: [],
    };
  }

  componentDidMount() {
    get("/api/candidates", {}).then((candidates) => {
      this.setState({
        candidateList: candidates,
      })
    })
    // get("/api/whoami").then((user) => {
    //   if (user._id) {
    //     // they are registed in the database, and currently logged in.
    //     this.setState({ userId: user._id });
    //   }
    // });
  }

  handleLogin = (res) => {
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
    window.location.href = "/";
  };

  submitVote = (voterID,PIN,index) => {
    post('api/vote',{
      address: this.state.candidateList[index].address,
      voterID,
      PIN
    }).then(()=>{
      console.log("Voted");
      this.setState({
        voted:true,
      })
    })
  }

  startElection = () => {
    get('/api/start',{}).then(() => {
      this.setState({
        hasStarted: true,
      })
    });
  }

  addVoter = (voterID, PIN) => {
    post('/api/addVoter',{
      voterID,
      PIN,
    });
  }

  addCandidate = (name, party, symbol) => {
    post('/api/addCandidate',{
      name,
      party,
      symbol,
    });
  }

  showResult = () => {
    window.location.href = '/results';
    // get('/api/votes', {}).then((votes_) => {
    //   this.setState({
    //     votes: votes_,
    //   });
    // });
  };
  
  render() {
    return (
      <>
        <NavBar
          userId={this.state.userId}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <div className="App-container">
          <Router>
            <Home path="/" 
              userId={this.state.userId}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              handleChange = {this.handleChange}
              showResults = {this.showResult}
            />
            <Admin path="/admin" start = {this.startElection} candidateList = {this.state.candidateList} addCandidate = {this.addCandidate} addVoter = {this.addVoter} hasStarted = {this.state.hasStarted} />
            <Vote path='/vote' voted={this.state.voted} candidateList = {this.state.candidateList} submitVote = {this.submitVote}/>
            <Results path='/results' votes={this.state.votes} candidateList = {this.state.candidateList} />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
