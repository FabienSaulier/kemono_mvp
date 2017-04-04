import React from 'react';
import { Grid } from 'react-bootstrap';

import AppNavigationContainer from '../containers/AppNavigationContainer.js';
import InsiderMenu from '../components/InsiderMenu.js';

const App = ({ children }) => (
  <div>
    <AppNavigationContainer />
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
