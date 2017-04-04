import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Item, Grid , Image} from 'semantic-ui-react'
import { Link } from 'react-router'



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
      <Container>
        <Header size='large'>Mon profil</Header>
        <Grid columns='4' >
          <Grid.Row>
            <Grid.Column>
              <ProfilPicture src={userProfile.picture}/>
            </Grid.Column>
            <Grid.Column>
              {userProfile.firstName} {userProfile.lastName} <br />
              {userMail}  <br />
              {userProfile.birthday}  <br />
              {userProfile.picture}  <br />
              {userProfile.phone}  <br />
              {this.displayUserPets()}
            </Grid.Column>

          </Grid.Row>

        </Grid>

        <Button as={Link} to='/profil/edit/' name='editProfil' content='Modifier' icon='edit' size='big' labelPosition='left' />
      </Container>
    )
  }
};

const ProfilPicture = ({src}) => {
  if(!src){
    src = 'noImage.png';
  }
  return  <Image size='medium' shape='rounded'  src={'/img/'+src}  />
}
