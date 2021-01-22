import React, { Component } from "react";
import {Container, Image, Grid, Segment, Divider, Header, Icon, Button } from 'semantic-ui-react'

import "./Home.css"

class Home extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    window.location.href = '/vote';
  }

  render() {
    return (
      <>
        <div className="Home-content-heading">
          <div className="Home-content">
          <Grid columns={2}>
            <Grid.Column>
              <br/><br/>
              <Header as='h1'>
                <div className = 'Home-head' >
                  <Header.Content size='large'>
                  <Icon name='btc' size='large'/>
                      An e-Voting System based on Blockchain   
                  </Header.Content>
                </div>
              </Header>
              <Segment basic textAlign='center'>
                <Button onClick={this.handleClick} primary>Vote!</Button>
                <Divider horizontal>Or</Divider>
                <Button onClick={this.props.showResults}> Results </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Image size='medium' src='https://i.ibb.co/QPQqV12/photos.png' />
            </Grid.Column>
          </Grid>
          </div>
        </div>
        <Container>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Icon name = 'check square' size='huge' color='yellow'/><br />
              Verifiable and Immutable Voting
            </Grid.Column>
            <Grid.Column>
            <Icon name = 'privacy' size='huge' color='yellow'/><br />
            The anonymity of Voters is maintained using Crypto-systems.
            </Grid.Column>
            <Grid.Column>
            <Icon name = 'battery high' size='huge' color='yellow'/><br />
            High-voter turnout
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
            <Icon name = 'fast forward' size='huge' color='yellow'/><br />
              Instant Results
            </Grid.Column>
            <Grid.Column>
            <Icon name = 'money bill alternate' size='huge' color='yellow'/><br />
              Exponentially low Expense
            </Grid.Column>
            <Grid.Column>
            <Icon name = 'balance scale' size='huge' color='yellow'/><br />
              Scalable
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      </>
    )
  }
}

export default Home;
