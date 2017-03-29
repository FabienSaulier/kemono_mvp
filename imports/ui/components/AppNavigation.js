import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Menu , Image, Container} from 'semantic-ui-react'

import PublicNavigation from './PublicNavigation.js';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';



const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (

  <Menu size='massive' borderless className="navMenu">
    <Container >

      <Menu.Item>

        <Image src='/img/icons/patte_kemono_blanc.png' />
        <h1 style={{'marginLeft':'15px'}}>Kemono</h1>
      </Menu.Item>
      { renderNavigation(hasUser) }

    </Container>
  </Menu>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
