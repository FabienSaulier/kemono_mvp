import React, { Component } from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default class InsiderMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    if(!Meteor.userId())
      return null;

    return(
      <Navbar inverse collapseOnSelect className="insider-menu">
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/dashboard"><NavItem>Tableau de bord</NavItem></LinkContainer>
            <LinkContainer to="/pets"><NavItem>Mes animaux</NavItem></LinkContainer>
            <LinkContainer to="/campaignsList"><NavItem>Mes remboursements</NavItem></LinkContainer>
            <LinkContainer to="/profil/edit/"><NavItem>Profil</NavItem></LinkContainer>
            <LinkContainer to="/account"><NavItem>Compte</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
