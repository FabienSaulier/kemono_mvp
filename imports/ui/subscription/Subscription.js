import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Grid, Row, Col, Image, Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';


 export class Subscription extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    Meteor.call('createMangoPayUser',
      (error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log(res);
        }
      });

  }

  render() {
    return(
      <div>
        <div>page subscription</div>
        <div>liste animaux with picture</div>

      </div>


    )
  }
};
