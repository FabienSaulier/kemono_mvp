import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { Menu, Icon, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';

const PublicNavigation = () => (
  /*
  <MediaQuery minWidth={1170}>
    {(matches) => {
      if (matches) {
        return (
          */

      <span style={{'display':'flex'}}>
        <Menu.Item  as={Link} to='/' >
            J'AI UN ANIMAL
        </Menu.Item>
        <Menu.Item  as={Link} to='/' >
            JE VEUX AIDER LES ANIMAUX
        </Menu.Item>
        <Menu.Item  as={Link} to='/' >
            JE SUIS V&Eacute;T&Eacute;RINAIRE
        </Menu.Item>
        <Menu.Item  as={Link} to='/login'>
            CONNEXION
        </Menu.Item>
        <Menu.Item as={Link} to='/signup'>
            INSCRIPTION
        </Menu.Item>
      </span>
          /*
        );
      } else {
        return (
          <MediaQuery maxWidth={1170} >
            <Menu.Menu  vertical>

              <Dropdown item text='Categories'>
                <Dropdown.Menu>
                  <Dropdown.Item>Electronics</Dropdown.Item>
                  <Dropdown.Item>Automotive</Dropdown.Item>
                  <Dropdown.Item>Home</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Menu.Menu>
          </MediaQuery>
        );
      }
    }}
  </MediaQuery>
  */
);

export default PublicNavigation;
