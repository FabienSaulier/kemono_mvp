import React from 'react';
import { browserHistory , Link} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));


const AuthenticatedNavigation = ({user}) => {
  console.log(user);
  return(

      <Nav pullRight>
        <NavDropdown title={user.profile.firstName+' '+user.profile.lastName} id="basic-nav-dropdown">
          <MenuItem >
            <LinkContainer to="/">
              <NavItem  href="/">Tableau de bord</NavItem>
            </LinkContainer>
          </MenuItem>
          <MenuItem >
            <LinkContainer to="/documents">
              <NavItem  href="/documents">Documents</NavItem>
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
            <LinkContainer to="/profil">
              <NavItem  href="/profil">Mon profil</NavItem>
            </LinkContainer>
          </MenuItem>
          <MenuItem >
            <LinkContainer to="/documents">
              <NavItem  href="/documents">Documents</NavItem>
            </LinkContainer>
          </MenuItem>
          <MenuItem >
            <LinkContainer to="/">
              <NavItem  href="/" onClick={ handleLogout } >Déconnexion</NavItem>
            </LinkContainer>
          </MenuItem>
        </NavDropdown>
      </Nav>
  )
}

export default AuthenticatedNavigation;
