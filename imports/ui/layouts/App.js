import React from 'react';
import { Grid } from 'react-bootstrap';

import AppNavigationContainer from '../containers/AppNavigationContainer.js';
//import InsiderMenu from '../components/InsiderMenu.js';



// <InsiderMenu />

const App = ({ children }) => (
  <div>
    <AppNavigationContainer />
    <Grid>

      { children }
    </Grid>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
