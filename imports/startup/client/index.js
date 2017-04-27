import { Bert } from 'meteor/themeteorchef:bert';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './routes.js';

import { Meteor } from 'meteor/meteor';

Bert.defaults.style = 'growl-top-right';

S3_IMG_URL = "https://s3.eu-central-1.amazonaws.com/kemono1/Images/";


// Gather extended user Data
Meteor.subscribe('userData');
