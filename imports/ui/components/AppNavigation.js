import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, NavItem } from 'react-bootstrap'


import PublicNavigation from './PublicNavigation.js';
import AuthenticatedNavigationContainer from './AuthenticatedNavigationContainer.js';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigationContainer /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (
  <Navbar>
    <Navbar.Header>
      <a className="navbar-brand" href="/"><img src="img/logo_kemono_blanc2.png" id="logo1" /></a>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      { renderNavigation(hasUser) }
    </Navbar.Collapse>
  </Navbar>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
