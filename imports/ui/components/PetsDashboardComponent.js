import React from 'react'
import { browserHistory } from 'react-router'
import { Icon , Button} from 'semantic-ui-react'
import { Link } from 'react-router'

const PetsDashboardComponent = ({ user }) => (
  <div>
    <Icon color='teal' size='big' name='add circle' />
    <Link to="/pets/edit">Ajouter un animal</Link>
  </div>
  /**
  documents.length > 0 ? <ListGroup className="DocumentsList">
    {documents.map(({ _id, title }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { title }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No documents yet.</Alert>
  **/
);


export default PetsDashboardComponent;
