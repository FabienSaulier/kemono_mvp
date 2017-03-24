import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { Menu, Icon, Dropdown} from 'semantic-ui-react'
import MediaQuery from 'react-responsive';

const PublicNavigation = () => (
  <MediaQuery minWidth={1170}>
    {(matches) => {
      if (matches) {
        return (
          <Menu.Menu position='right'>
            <Menu.Item>
              <LinkContainer to='#'>
                <NavItem href="#">J'AI UN ANIMAL</NavItem>
              </LinkContainer>
            </Menu.Item>
            <Menu.Item>
              <LinkContainer to='/'>
                <NavItem href="/">JE VEUX AIDER LES ANIMAUX</NavItem>
              </LinkContainer>
            </Menu.Item>
            <Menu.Item>
              <LinkContainer to='/'>
                <NavItem href="/">JE SUIS V&Eacute;T&Eacute;RINAIRE</NavItem>
              </LinkContainer>
            </Menu.Item>
            <Menu.Item>
              <LinkContainer to="login">
                <NavItem href="/login">CONNEXION</NavItem>
              </LinkContainer>
            </Menu.Item>
            <Menu.Item>
              <LinkContainer to="signup">
                <NavItem  href="/login">INSCRIPTION</NavItem>
              </LinkContainer>
            </Menu.Item>
          </Menu.Menu>
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
);

export default PublicNavigation;
