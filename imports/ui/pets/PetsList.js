import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Grid, Row, Col, Image, Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import {AgeFromDate } from 'age-calculator';
import {AddPet} from '../components/AddPet'

 export class PetsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return(
      <Grid>
        {renderPetRow(this.props.pets)}
        <Row >
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            <AddPet />
          </Col>
        </Row>
      </Grid>
    )
  }

};

const popoverTop = (
  <Popover id="popover-positioned-top">
    Raté, c'est pas encore fait!
  </Popover>
)

const renderPetRow = (pets) => {
  return pets.map(function(pet,i){
    console.log(pet);
    const sex = pet.sex=='MALE' ? 'Mâle': 'Femelle';
    const age = new AgeFromDate(pet.birthday).age;

    return (
      <div  key={i} style={{marginBottom:'25px'}}>
        <Row>
          <Col sm={2}>
            <Image responsive rounded src='/img/no_pic_cat.jpg'  />
          </Col>
          <Col sm={10}>
            <span>{pet.name}</span>
            <Link to={'/pets/edit/'+pet._id} >
              <Glyphicon glyph="glyphicon glyphicon-cog" style={{fontSize:'15px', 'marginLeft':'15px'}}/><br /><br />
            </Link>
            {sex}, {age} ans<br />
            {pet.race}<br />
            {pet.description}<br />
            <br />

            <div>
              <Glyphicon glyph="glyphicon glyphicon-remove" style={{color:'red', fontSize:'15px', marginRight:'5px'}}/>
              {pet.name} n'est pas encore abonné{pet.sex=='FEMALE'?'e':''}.<br />
            </div>
            <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverTop}>
              <Button>Abonner {pet.name}</Button>
            </OverlayTrigger>
            <br />
            <br />
            <div>
              {pet.name} n'a pas de campagnes de remboursements en cours.
            </div>
          </Col>
        </Row>
        <Row>
          <hr />
        </Row>
      </div>
    )
  })

}



const ProfilPicture = ({src}) => {
  if(!src){
    src = 'noImage.png';
  }
  return  <Image responsive rounded src={'/img/'+src}  />
}
