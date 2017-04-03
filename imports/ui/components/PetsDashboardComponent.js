import React from 'react'
import { browserHistory } from 'react-router'
import { Card, Image,Icon , Button, Label} from 'semantic-ui-react'
import { Link } from 'react-router'

const PetsDashboardComponent = ({ pets }) => {
  console.log(pets);
  return(
    <div>
      <PetGroupCards pets={pets} />
    </div>
  )
}

const PetGroupCards = ({pets}) => {
  if(!pets || pets.length == 0)
    return null;
  else
    return(
      <Image.Group>
        {pets.map(function(pet, i){
          return (
            <PetCard pet={pet} key={i}/>
          );
        })}

        <Image size='big'>
          <Icon color='teal' size='big' name='add circle' />
          <Link to="/pets/edit">Ajouter un animal</Link>
        </Image>
      </Image.Group>
    )
}

const PetCard = ({pet}) => {
  return(

      <Image src='/img/chat1.jpg' size='small' shape='circular' />

  )
}


export default PetsDashboardComponent;
