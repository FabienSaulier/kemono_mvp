import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Glyphicon, Image, Media} from 'react-bootstrap'
import { Link } from 'react-router'

const PetsDashboardComponent = ({ pets }) => {
  console.log(pets);
  return(
    <AddAnimal />
  )
}


const PetGroupCards = ({pets}) => {

  if(!pets || pets.length == 0){
      return (
      <Image.Group>
        <Image size='big'>
          <Icon color='teal' size='big' name='add circle' />
          <Link to="/pets/edit">Ajouter un animal</Link>
        </Image>
      </Image.Group>
    )
  }

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

      <Image src='/img/no_pic_cat.jpg' size='small' shape='circular' />

  )
}

const AddAnimal = ()  =>(
  <div>
    <Glyphicon glyph="glyphicon glyphicon-plus-sign" style={{color:'#e84b3d',fontSize:'15px', marginRight:'5px'}}/>
    <Link to="/pets/edit">Ajouter un animal</Link>
  </div>
)


export default PetsDashboardComponent;
