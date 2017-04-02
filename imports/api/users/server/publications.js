import { Meteor } from 'meteor/meteor';

/**
Publish pets_id for the current user.
**/
Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { pets_id: 1}
    });
  } else {
    this.ready();
  }
});
