import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import Pets from '../pets';

/**
Publish only the user's Pets
**/
Meteor.publish('userPets', function (userPetsId) {
  console.log("publish userPet: "+userPetsId);
  check(userPetsId, [String]);
  if(userPetsId){
    if (this.userId) {
      return Pets.find({_id: {$in: userPetsId }});
    } else {
      this.ready();
    }
  }
});

Meteor.publish('pets', function () {
  console.log("publish pets");
  return Pets.find();
});
