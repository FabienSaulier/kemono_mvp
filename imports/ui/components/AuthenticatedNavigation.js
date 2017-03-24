import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Menu, Dropdown } from 'semantic-ui-react'


const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (

  <Menu.Menu position='right'>
  <Dropdown item text='actions'>
    <Dropdown.Menu>
      <Dropdown.Item>
        <LinkContainer to='/'>
          <NavItem href="/">Dashboard</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='/documents'>
          <NavItem href="/documents">Documents</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='/pets'>
          <NavItem href="/pets">Pets</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='/campaignsList'>
          <NavItem href="/campaignsList">Campagnes</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='/profil'>
          <NavItem href="/profil">Profil</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='/account'>
          <NavItem href="/account">Account</NavItem>
        </LinkContainer>
      </Dropdown.Item>
      <Dropdown.Item>
        <LinkContainer to='#'>
          <NavItem href="#" onClick={ handleLogout }>Logout</NavItem>
        </LinkContainer>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Menu.Menu>


);

export default AuthenticatedNavigation;
