import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron } from 'react-bootstrap';
import { Segment, Label} from 'semantic-ui-react'


const Index = () => (

  Meteor.userId() ?
   (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Dashboardzzz</h2>
    </Jumbotron>

    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>En cours</Label>
      Le coût des soins vétérinaires peut être très élevé.
      Découvrez comment Kemono aide les propriétaires à faire face ensemble,
      pour le bien-être de leurs compagnons ! Intégrez le réseau de partenaires Kemono pour accroître votre patientèle et votre visibilité sur Internet.
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>Mes compagnons</Label>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment padded='very'>
      <Label attached='top left' style={{'fontSize':'14px'}}>Les campagnes en cours sur Kemono</Label>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);


export default Index;
