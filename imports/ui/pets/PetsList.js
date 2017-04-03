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
            <div key={i} style={{width:'650px'}}>
              <Grid key={i}  columns={2} >
                <Grid.Row>
                  <Grid.Column>
                    <Image src='/img/chien3.jpg' size="medium" />
                  </Grid.Column>
                  <Grid.Column>
                    <div>{pet.name}</div>
                    <div>{pet.type}</div>
                    <div>{pet.sex}</div>
                    <div>{pet.birthday}</div>
                    <div>{pet.origin}</div>
                    <div>{pet.sterilized}</div>
                  </Grid.Column>
                </Grid.Row>

              </Grid>

                <Divider />
              </div>

            );
        })}

      </div>

    )
  }
};
