import React, { Component } from 'react';
import {Statistic} from 'semantic-ui-react';
import Candidate from '../modules/Candidate';
import { get } from "../../utilities";
export default class Results extends Component {
    constructor(props){
        super(props);
        this.state = {
            votes: [],
        }
    }

    componentDidMount(){
        get('/api/votes', {}).then((votes_) => {
            this.setState({
              votes: votes_,
            });       
        });
    }
    render() {
        return (
            <div>
                {this.props.candidateList.map((candidate,key) => ((
                    <>
                    <Candidate symbol = {candidate.symbol} party = {candidate.party} name = {candidate.name} />
                    <Statistic>
                        <Statistic.Value>{this.state.votes[key]}</Statistic.Value>
                        <Statistic.Label>Votes</Statistic.Label>
                    </Statistic>
                    </>
                    )
                ))}
            </div>
        )
    }
}
