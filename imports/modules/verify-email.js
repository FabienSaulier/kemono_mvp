/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';


export default VerifyEmail = ({params}) => {
  Accounts.verifyEmail( params.token, ( error ) =>{
    if ( error ) {
      browserHistory.push( '/' );
      console.log(error);
      Bert.alert( error.reason, 'danger' );
    } else {
      browserHistory.push( '/' );
      Bert.alert('Votre compte est validé! Merci!', 'success' );
    }
  })
  return(null);
}
