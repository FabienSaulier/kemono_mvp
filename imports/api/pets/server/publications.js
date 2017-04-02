import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import Pets from '../pets';

/**
Publish user Pets
**/
Meteor.publish('userPets', function (userPetsId) {
  console.log("pubbbbbb");
  console.log(userPetsId);
  if(userPetsId){
    check(userPetsId, [String]);

    if (this.userId) {
      return Pets.find({_id: {$in: userPetsId }});
    } else {
      this.ready();
    }
  }


});
