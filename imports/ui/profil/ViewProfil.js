import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Item, Grid , Image} from 'semantic-ui-react'
import { Link } from 'react-router'

 export class ViewProfil extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.displayUserPets = this.displayUserPets.bind(this);
  }

  displayUserPets(){

    return "user pets <br />";
  }
  render() {
    let userProfile = this.props.profile;
    let userMail = this.props.emails[0].address;
    console.log(userMail);

    return (
      <div>
        <Header size='large'>Mon profil</Header>


        <Grid columns='4' >
          <Grid.Row>
            <Grid.Column>
              <Image size='medium' src='/img/snoden.jpg'  />
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
      </div>
    )
  }
};
