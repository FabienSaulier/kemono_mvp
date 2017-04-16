import { Meteor } from 'meteor/meteor';

/** client part for FS Collection **/
if (Meteor.isClient) {
  var imageStore = new FS.Store.S3("images");
  Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        console.log(message);
      }
    }
  });
}

Images.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});

export default Images;
