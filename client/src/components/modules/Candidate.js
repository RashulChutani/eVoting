import React, { Component } from "react";
import {Item} from 'semantic-ui-react'
import "./Candidate.css";
// import "./.css"

class Candidate extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "Candidate-Border">
        <h1> {this.props.name} </h1>
        <b> Symbol: </b> {this.props.symbol}
        <b> Party: </b> {this.props.party}
          {/* <Item>
            <Item.Content>
              <Item.Header as='h1'>{this.props.symbol}</Item.Header>
              <Item.Header as='h2'>{this.props.name}</Item.Header>
              <Item.Meta as='h2'>{this.props.party}</Item.Meta>
            </Item.Content>
          </Item> */}
      </div>
    )
  }
}

export default Candidate;
