import React from 'react'
import { browserHistory } from 'react-router'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router'

const CampaignsDashboardComponent = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image floated='left' size='small' src='/img/chat1.jpg' />
        <Card.Header>
          Minou
        </Card.Header>
        <Card.Meta>
          Le chat de Delphine
        </Card.Meta>
        <Card.Description>
          Il s'est cassé la patte en sautant du balcon. J'habite au 3° étage, c'est un peu haut, aieaie, il souffre :'
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image floated='right' size='medium' src='/img/chien1.jpg' />
        <Card.Header>
          Filou
        </Card.Header>
        <Card.Meta>
          Le chien de Max
        </Card.Meta>
        <Card.Description>
          Faut-il vraiment mettre une description?
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image floated='right' size='small' src='/img/chien2.jpg' />
        <Card.Header>
          Jenny
        </Card.Header>
        <Card.Meta>
          Le chien de Michel
        </Card.Meta>
        <Card.Description>
          Blablablab blablab Blablabla Blablablab Blablablab Blablablab Blablablab
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
);


export default CampaignsDashboardComponent;
