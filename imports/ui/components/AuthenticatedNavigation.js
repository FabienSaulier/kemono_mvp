import React from 'react';
import { browserHistory , Link} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown,Image, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const AuthenticatedNavigation = ({user}) => {
  console.log(user);
  return(
      <Nav pullRight >
        <Dropdown id="dropdownMenu">
          <Dropdown.Toggle noCaret>
          {user.profile.firstName+' '+user.profile.lastName} <MenuAvatar src={user.profile.picture} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem >
              <LinkContainer to="/dashboard">
                <NavItem  href="/dashboard">Tableau de bord</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem >
              <LinkContainer to="/pets">
                <NavItem  href="/pets">Mes animaux</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem >
              <LinkContainer to="/campaignsList">
                <NavItem  href="/campaignsList">Mes remboursements</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem >
              <LinkContainer to="/profil/edit/">
                <NavItem  href="/profil/edit/">Mon profil</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem >
              <LinkContainer to="/account">
                <NavItem  href="/account">Mon compte</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem >
              <LinkContainer to="/">
                <NavItem  href="/" onClick={ handleLogout } >Déconnexion</NavItem>
              </LinkContainer>
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
  )
}

const MenuAvatar = (props) => {
  if(props.src)
    return <Image circle width='50px'  src={'https://s3.eu-central-1.amazonaws.com/kemono1/Images/'+props.src} />
  else
    return <Image circle width='50px'  src='/img/no_pic_human.png' />
}

export default AuthenticatedNavigation;
