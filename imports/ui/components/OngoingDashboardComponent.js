import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



function resendMailVerif (){
  Meteor.call('sendVerificationLink',
    (error, res) => {
      if (error) {
        console.log(error);
      } else {
        Bert.alert("Un mail de vérification a été envoyé à "+Meteor.user().emails[0].address, 'success');
      }
    });
}

function EmailToVerify(){
  return(
   <div>
     <Glyphicon glyph="glyphicon glyphicon-chevron-right" />
     Vérifier votre e-mail.
     <LinkContainer to="/" onClick={()=>{resendMailVerif()}}>
       <a style={{fontSize:'x-small', marginLeft:'10px'}}>Renvoyer l'e-mail de vérification</a>
     </LinkContainer>
   </div>
  )
}

function HasToCompleteProfil(){
  return(
    <div>
      <Glyphicon glyph="glyphicon glyphicon-chevron-right" />
      <LinkContainer to="/profil/edit/">
        <a>Compléter votre profil</a>
      </LinkContainer>
    </div>
  )
}

export default class OngoingDashboardComponent extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
  }

  hasToCompleteProfil(){
    const usr = Meteor.user();
    if(!usr.firstName || !usr.lastName || !usr.birthday || !usr.sex
    || !usr.phone || !usr.address || !usr.city || !usr.state || !usr.zipCode){
      return true
    } else
      return false;
  }

  render() {
    console.log(Meteor.user());
    if(!Meteor.user()) return null;

    return(

      <div>
        {(this.props.user && !this.props.user.emails[0].verified) ?  <EmailToVerify /> : null}
        {this.hasToCompleteProfil() ? <HasToCompleteProfil /> : null}
      </div>

    )
  }




}
