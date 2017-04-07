import React from 'react';
import { Meteor } from 'meteor/meteor';
import {PageHeader, Grid, Col, Row, Image, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


/**



Class unused




**/

export class ViewProfil extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.displayUserPets = this.displayUserPets.bind(this);
  }

  displayUserPets(){
    let display = "";
    if(this.props.pets_id && this.props.pets_id.length != 0){
      for(petId of this.props.pets_id){
        display += petId+"   ";
      }
    } else {
      display = "Vous n'avez pas encore enregistré d'animaux de compagnie."
    }
    return display;
  }

  render() {
    let userProfile = this.props.profile;
    let userMail = this.props.emails[0].address;
    console.log(userProfile);

    return (
      <div>
        <PageHeader size='large'>Mon profil</PageHeader>
        <Grid >
          <Row>
            <Col>
              <ProfilPicture src={userProfile.picture}/>
            </Col>
            <Col>
              {userProfile.firstName} {userProfile.lastName} <br />
              {userMail}  <br />
              {userProfile.birthday}  <br />
              {userProfile.picture}  <br />
              {userProfile.phone}  <br />
              {this.displayUserPets()}
            </Col>
          </Row>
        </Grid>
        <LinkContainer to="/profil/edit/">
          <Button>Modifier mon profil</Button>
        </LinkContainer>
      </div>
    )
  }
};

const ProfilPicture = ({src}) => {
  if(!src){
    src = 'noImage.png';
  }
  return  <Image size='medium' shape='rounded'  src={'/img/'+src}  />
}
