import { Bert } from 'meteor/themeteorchef:bert';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './routes.js';

import { Meteor } from 'meteor/meteor';

Bert.defaults.style = 'growl-top-right';

// Gather extended user Data
Meteor.subscribe('userData');
