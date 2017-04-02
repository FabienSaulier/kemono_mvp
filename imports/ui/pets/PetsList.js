import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Item, Grid , Image} from 'semantic-ui-react'
import { Link } from 'react-router'

 export class PetsList extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return(
        <div>Here is my pets list</div>
    )


  }
};
