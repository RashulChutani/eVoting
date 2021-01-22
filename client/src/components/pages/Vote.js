import React, { Component } from "react";
import { Segment,Form, Radio, Input,Button, Icon } from 'semantic-ui-react'
import Candidate from '../modules/Candidate';
import PageLoader from '../modules/PageLoader';
import './Vote.css';

class Vote extends Component {
  constructor(props){
    super(props);
    this.state = {
        voterID: "",
        PIN: "",
        displayElection: false,
        selected: "",
        clicked: false,
    }
  }

  handleChangeInVoterID = (event) => {
      this.setState({
          voterID: event.target.value,
      })
  }

  handleChangeInPIN = (event) => {
    this.setState({
        PIN: event.target.value,
    })
  }

  handleChangeInSelection = (event, {value}) => {
      this.setState({
          selected: value
      })
  }
  handleClick = (event) => {
      this.setState({
          displayElection: true
      })
  }
  handleSubmit = () => {
      this.setState({
          clicked: true,
      })
      let candidate = parseInt(this.state.selected);
      this.props.submitVote(this.state.voterID, this.state.PIN, candidate);
  }

  render() {
      if(!this.state.displayElection){
        return (
            <div className="Vote-card">
              <Input className="Vote-add" label="RRC" placeholder="Voter ID" onChange={this.handleChangeInVoterID}/><br />
              <Input className="Vote-add" placeholder="PIN" onChange={this.handleChangeInPIN} /><br />
              <Button className="Vote-add" secondary onClick={this.handleClick}>Cast My Vote</Button> 
            </div>
          )
      }
      if(this.props.voted){
          return (
          <div>
              <Segment> <Icon name='envelope' size='mini' />Your vote has been recorded! </Segment>
          </div>
          );
      }
      if(this.state.clicked){
        return (<PageLoader />)
      }
      return (
            <>
            <Form>
                {this.props.candidateList.map((candidate,key) => (
                    <Form.Field>
                        <Radio 
                            name='radioGroup'
                            value = {key.toString()}
                            checked={this.state.selected === key.toString()}
                            onChange = {this.handleChangeInSelection}
                        />
                        <Candidate symbol = {candidate.symbol} party = {candidate.party} name = {candidate.name} />
                    </Form.Field>
                ))}
            </Form>
            <Button secondary onClick={this.handleSubmit}> Cast My Vote </Button>
            </>
      )
  }
}

export default Vote;
