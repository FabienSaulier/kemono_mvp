import React from 'react';
import { Row, Col, Grid, Navbar} from 'react-bootstrap';

import AppNavigationContainer from '../containers/AppNavigationContainer.js';
//import InsiderMenu from '../components/InsiderMenu.js';



// <InsiderMenu />

const App = ({ children }) => (
  <div>
    <AppNavigationContainer />
    <Grid>

      { children }
    </Grid>
    <Navbar fixedBottom>
      <div className="container-fluid" id="container_footer">
        <Row  align="center">
          <Col col-xs-12 col-sm-12 col-md-12 col-lg-12>
            <div className="social_foot">
              <ul>
                <li><a href="#" target="_blank"><img src="/img/facebook-logo-button_white.png" className="img-responsive img-footer"/></a></li>
                <li><a href="#" target="_blank"><img src="/img/twitter-logo-button_white.png" className="img-responsive img-footer"/></a></li>
                <li><a href="#" target="_blank"><img src="/img/google-plus-logo-button_white.png" className="img-responsive img-footer"/></a></li>
                <li><a href="#" target="_blank"><img src="/img/linkedin-logo-button_white.png" className="img-responsive img-footer"/></a></li>
                <li><a href="#" target="_blank"><img src="/img/instagram-logo_white.png" className="img-responsive img-footer"/></a></li>
              </ul>
            </div>
          </Col>
          <p className="footnotes">© 2017 Kemono <br/></p>
        </Row>
      </div>
    </Navbar>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
