import React from 'react';
import { browserHistory , Link} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Menu, Dropdown, Image} from 'semantic-ui-react'

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  console.log(user);
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const trigger = (
  <span>
    <Image  avatar src='/img/fabien.jpg' /> {userName()}
  </span>
)

const AuthenticatedNavigation = () => (
  <Menu.Menu position='right'>
    <Dropdown trigger={trigger}  icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/' >
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/documents'>
          Documents
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/pets'>
          Pets
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/campaignsList'>
          Campagnes
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/profil'>
          Profil
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/account'>
          Account
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/' onClick={ handleLogout } >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
</Menu.Menu>
);

export default AuthenticatedNavigation;
