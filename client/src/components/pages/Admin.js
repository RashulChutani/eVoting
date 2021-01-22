import React, { Component } from 'react';
import { Input, Button, Header } from 'semantic-ui-react';
import PageLoader from '../modules/PageLoader';
import Candidate from '../modules/Candidate';
import './Admin.css';
export default class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            voterID: "",
            PIN: "",
            started: this.props.hasStarted,
            displayLoader: false,
            candidateName: "",
            party: "",
            symbol: "",
            alreadyStarted: false,
            rerender: 0,
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

    handleClick = () => {
        this.props.addVoter(this.state.voterID, this.state.PIN);
    }

    handleChangeInName = (event) => {
        this.setState({
            candidateName: event.target.value,
        })
    }

    handleChangeInParty = (event) => {
        this.setState({
            party: event.target.value,
        })
    }

    handleChangeInSymbol = (event) => {
        this.setState({
            symbol: event.target.value,
        })
    }

    handleAddCandidate = () => {
        this.props.addCandidate(this.state.candidateName, this.state.party, this.state.symbol);
        this.setState({
            rerender: this.state.rerender+1,
        })
    }

    startElection = () => {
        /// Display Loader
        this.setState({
            displayLoader: true,
        })
        this.props.start();
    }

    running = () => {
        this.setState({
            alreadyStarted: true,
        })
    }

    render() {
        if(this.props.hasStarted || this.state.alreadyStarted){
            return (
                <div>
                    <div className="Admin-card">
                        <Input className = 'Admin-add' label="RRC" placeholder="Voter ID" onChange={this.handleChangeInVoterID}/>
                        <Input className = 'Admin-add' placeholder="PIN" onChange={this.handleChangeInPIN} />
                        <Button className = 'Admin-add' onClick={this.handleClick}> Add Voter </Button>
                    </div>
                    <div className='Admin-card'>
                        <Input className = 'Admin-add' placeholder="Name" onChange={this.handleChangeInName} />
                        <Input className = 'Admin-add' placeholder="Party" onChange={this.handleChangeInParty}/>
                        <Input className = 'Admin-add' placeholder="Symbol" onChange={this.handleChangeInSymbol}/>
                        <Button onClick={this.handleAddCandidate} > Add Candidate </ Button>
                    </div>

                    <Header size = 'medium'>Candidate List</Header> 
                    
                    {this.props.candidateList.map((candidate,key) => (
                        <Candidate symbol = {candidate.symbol} party = {candidate.party} name = {candidate.name} />
                    ))}
                </div>
            );
        }
        if(this.state.displayLoader){
            return(
                <>
                 <PageLoader />
                </>
            )
        }
        return (
            <div className="Admin-card">
                <Button onClick={this.startElection}> Start Election </Button><br /> <br/>
                <Button onClick={this.running}> Election Running </Button>
            </div>
        )
    }
}
