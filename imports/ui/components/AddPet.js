import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

export const AddPet = ()  =>(
  <div>
    <Glyphicon glyph="glyphicon glyphicon-plus-sign" style={{color:'#e84b3d',fontSize:'15px', marginRight:'5px'}}/>
    <Link to="/pets/edit">Ajouter un animal</Link>
  </div>
)
