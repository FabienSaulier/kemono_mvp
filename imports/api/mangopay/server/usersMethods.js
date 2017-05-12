import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';
import { Meteor } from 'meteor/meteor';

import {MangoPayApi} from './mangoPayApi';



const createMangoNaturalUser = new ValidatedMethod({
  name: 'createMangoNaturalUser',
  validate: null,
  run() {
    console.log("createMangoNaturalUser");
    usrData = Meteor.user().profile;
    const user = new MangoPayApi.models.UserNatural({
      FirstName: usrData.firstName,
      LastName: usrData.lastName,
      Address: new MangoPayApi.models.Address({
          AddressLine1: usrData.address,
          //AddressLine2: ,
          City: usrData.city,
          //Region: ,
          PostalCode: usrData.zipCode,
          Country: 'FR'
      }),
      Birthday: new Date(usrData.birthday).getTime()/1000,
      Nationality: 'FR',
      CountryOfResidence: 'FR',
      //Occupation:'',
      //IncomeRange:'',
      Email:Meteor.user().emails[0].address
    });

    MangoPayApi.Users.create(user,  Meteor.bindEnvironment(function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        let mpUserId = {mpUserId:response.Id};
        let res =   Meteor.call("insertMangoPUserId", mpUserId);
        console.log(res);
      }
    }));
  }
});
