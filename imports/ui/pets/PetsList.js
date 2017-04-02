import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Divider, Header, Item, Grid , Image} from 'semantic-ui-react'
import { Link } from 'react-router'

 export class PetsList extends React.Component {
  constructor(props) {
    console.log(props.pets);
    super(props);
  }


  render() {
    return(
      <div>
        <Header as='h2'>Mes animaux de compagnie</Header>


        {this.props.pets.map(function(pet, i){
            return (

              <div key={i}>
                <div>{pet.name}</div>
                <div>{pet.type}</div>
                <div>{pet.sex}</div>
                <div>{pet.birthday}</div>
                <div>{pet.origin}</div>
                <div>{pet.sterilized}</div>
                <Divider />
              </div>

            );
        })}

      </div>

    )
  }
};
