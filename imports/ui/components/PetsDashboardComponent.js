import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Glyphicon, Image, Thumbnail, Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import {AddPet} from './AddPet'

const PetsDashboardComponent = ({ pets }) => {
  console.log(pets);
  return(
    <Grid>
      <Row>
        {renderPetCard(pets)}
        <Col sm={2} >
          <div style={{marginTop:'55px'}}>
            <AddPet />
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

const renderPetCard = (pets) => {
  return pets.map(function(pet,i){
    return (
      <Col sm={2} key={i}>
        <Link to='/pets'>
          <Thumbnail  >
            <Image src='/img/no_pic_cat.jpg' rounded height='80px' width='80px' />
            <h5>{pet.name}</h5>
          </Thumbnail>
        </Link>
      </Col>
    )
  })
}

export default PetsDashboardComponent;
