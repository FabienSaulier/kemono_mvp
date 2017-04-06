import React from 'react';
import { Meteor } from 'meteor/meteor';
import {PageHeader , Glyphicon , Grid, Row, Col, Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

 export class PetsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <PageHeader as='h2'>Mes animaux de compagnie</PageHeader>

        {displayPets(this.props.pets)}
        <div><Glyphicon glyph="star" />
          <Link to="/pets/edit">
             Ajouter un animal
          </Link>
        </div>
      </div>
    )
  }
};

const displayPets = (pets) =>{
  if(pets){
    return(
      pets.map(function(pet, i){
        console.log(pet);
        return (
          <PetComponent pet={pet} key={i}/>
        );
      })
    )
  } else return null;
}

const PetComponent = ({pet}) =>{
  return(
  <div  style={{width:'650px'}}>
    <Grid  >
      <Row>
        <Col>
          <ProfilPicture src='chien3.jpg' />
        </Col>
        <Col>
          <div>{pet.name}</div>
          <div>{pet.type}</div>
          <div>{pet.sex}</div>
          <div>{pet.birthday}</div>
          <div>{pet.origin}</div>
          <div>{pet.sterilized}</div>
        </Col>
      </Row>
    </Grid>
    <hr />
  </div>
  )
}

const ProfilPicture = ({src}) => {
  if(!src){
    src = 'noImage.png';
  }
  return  <Image responsive rounded src={'/img/'+src}  />
}
