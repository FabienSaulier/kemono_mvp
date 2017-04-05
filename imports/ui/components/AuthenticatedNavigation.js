import React from 'react';
import { browserHistory , Link} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const trigger = (user) => {
  console.log(user.profile.firstName);
  return(
    <span>
      <Image  avatar src='/img/fabien.jpg' /> {user.profile.firstName}
    </span>
  )
}

const AuthenticatedNavigation = ({user}) => {
  return(<div>toto</div>
    /*
    <Menu.Menu position='right'>
      <Dropdown trigger={trigger(user)}  icon={null}>
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
  */
  )
}

export default AuthenticatedNavigation;
