import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Grid, Row, Col, Image, Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';


 export class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }
    this.handleTestPaiement = this.handleTestPaiement.bind(this);
//    this.display = this.display.bind(this);
  }

  handleTestPaiement(){
    Meteor.call('testPayin',
      (error, result) => {
        if (error) {
          console.log("error");
          console.log(error);
        } else {
          console.log(result);
          console.log(result.RedirectURL);
          console.log(result.Id);
          this.setState({paiementUrl:result.RedirectURL});//, ()=>{this.displayPaiementForm()});


        }
      });
  }


  displayPaiementForm(){
    console.log("displayPaiementForm"+this.state.paiementUrl);
    if(this.state.paiementUrl){
      //style={{height:'650px', width:'400px'}}
      return(
        <iframe style={{height:'650px', width:'400px', border:'none'}}
          src={this.state.paiementUrl}/>

      )
    }
    return null;
  }


  render() {
    return(
      <div>
        <div>page subscription</div>
        <div>liste animaux with picture</div>
        <Button onClick={this.handleTestPaiement} >Test paiement</Button>
        <p>
          url paiement:{this.state.paiementUrl}
        </p>
        {this.displayPaiementForm()}
      </div>

    )
  }
};
