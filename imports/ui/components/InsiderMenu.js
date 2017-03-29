import React, { Component } from 'react'
import { Menu, Segment , Container} from 'semantic-ui-react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'

export default class InsiderMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    if(!Meteor.userId())
      return null;

    return (
        <Menu inverted stackable>
          <Menu.Item as={Link} to='/' name='index' active={activeItem === 'index'} onClick={this.handleItemClick} >
            Tableau de bord
          </Menu.Item>
          <Menu.Item as={Link} to='/pets' name='pets' active={activeItem === 'pets'} onClick={this.handleItemClick} >
            Mes animaux
          </Menu.Item>
          <Menu.Item as={Link} to='/campaignsList' name='campaignsList' active={activeItem === 'campaignsList'} onClick={this.handleItemClick} >
            Mes remboursements
          </Menu.Item>
          <Menu.Item as={Link} to='/profil' name='profil' active={activeItem === 'profil'} onClick={this.handleItemClick} >
            Profil
          </Menu.Item>
          <Menu.Item as={Link} to='/account' name='account' active={activeItem === 'account'} onClick={this.handleItemClick}  >
            Mon Compte
          </Menu.Item>
        </Menu>
    )
  }
}
