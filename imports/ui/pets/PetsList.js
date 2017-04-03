import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Container,  Button, Divider, Header, Item, Grid , Image} from 'semantic-ui-react'
import { Link } from 'react-router'

 export class PetsList extends React.Component {
  constructor(props) {
    console.log(props.pets);
    super(props);
  }


  render() {
    console.log(this.props.pets);
    return(
      <Container>
        <Header as='h2'>Mes animaux de compagnie</Header>

        {this.props.pets.map(function(pet, i){
          return (
            <PetComponent pet={pet} key={i}/>

          );
      })}

      </Container>

    )
  }
};

const PetComponent = ({pet}) =>{
  return(
  <div  style={{width:'650px'}}>
    <Grid  columns={2} >
      <Grid.Row>
        <Grid.Column>
          <ProfilPicture src='chien3.jpg' />
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
  )
}

const ProfilPicture = ({src}) => {
  if(!src){
    src = 'noImage.png';
  }
  return  <Image size='medium' shape='rounded'  src={'/img/'+src}  />
}
