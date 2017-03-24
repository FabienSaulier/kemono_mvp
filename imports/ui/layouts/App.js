import React from 'react';
import { Grid } from 'react-bootstrap';

import AppNavigation from '../containers/AppNavigation.js';
import InsiderMenu from '../components/InsiderMenu.js';

const App = ({ children }) => (
  <div>
    <AppNavigation />
    <Grid>
      <InsiderMenu />
      { children }
    </Grid>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
