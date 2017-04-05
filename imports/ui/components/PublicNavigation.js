import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (

  <Nav pullRight>
    <LinkContainer to="/">
      <NavItem eventKey={ 2 } href="/">J'AI UN ANIMAL</NavItem>
    </LinkContainer>
    <LinkContainer to="/">
      <NavItem eventKey={ 3 } href="/">JE VEUX AIDER LES ANIMAUX</NavItem>
    </LinkContainer>
    <LinkContainer to="/">
      <NavItem eventKey={ 4 } href="/">JE SUIS V&Eacute;T&Eacute;RINAIRE</NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={ 6 } href="/login">CONNEXION</NavItem>
    </LinkContainer>
    <LinkContainer to="/signup">
      <NavItem eventKey={ 7 } href="/signup">INSCRIPTION</NavItem>
    </LinkContainer>
  </Nav>

);

export default PublicNavigation;
